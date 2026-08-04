import { translations } from '../../translations';
import { formatDateToWeekDay, showHoursChartLabel } from '../../charts/index';
import { LitElement, html, css, PropertyValues, TemplateResult } from 'lit';
import { use, translate as _t, registerTranslateConfig } from 'lit-translate';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  HomeAssistant,
  HassEntity,
  WeatherEntity,
  WeatherForecast,
  WeatherCondition,
} from '../../types/home-assistant';
import { getWeatherIcon } from '../../icons';
import { type CardConfig, FULL_CARD_EDITOR_NAME, FULL_CARD_NAME, schema } from './const';
import { isDay } from '../../utils';
import { renderWarningSection } from '../../utils/warning-renderer';
import {
  resolveMeteoSwissEntities,
  getNumber,
  foehnInfo,
  type MeteoSwissEntityMap,
} from '../../utils/meteoswiss-resolver';

registerTranslateConfig({
  loader: lang => {
    return translations[lang];
  },
});

@customElement(FULL_CARD_NAME)
export class MeteoSwissCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;
  @state() private _forecast: WeatherForecast[] = [];
  @state() private _hourlyForecast: WeatherForecast[] = [];
  @state() private _forecastLoading = false;
  @state() private _openWarnings: Record<string, boolean> = {};
  @state() private _resolvedEntities: MeteoSwissEntityMap | null = null;
  private _loadedLang: string | undefined;
  private _resizeObserver: ResizeObserver | null = null;

  private _toggleWarning = (id: string) => {
    this._openWarnings = { ...this._openWarnings, [id]: !this._openWarnings[id] };
    this.requestUpdate();
  };

  private _lastEntityId: string | undefined;

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (this.hass && this.config && this.config.entity) {
      const entityChanged = this._lastEntityId !== this.config.entity;
      const hassChanged = changedProperties.has('hass');

      if (entityChanged) {
        this._lastEntityId = this.config.entity;
      }

      // Re-run resolver when entity changes OR when hass changes and resolution is incomplete
      if ((entityChanged || hassChanged) && this.config.auto_resolve_entities !== false) {
        const newResolved = resolveMeteoSwissEntities(this.hass, this.config.entity);
        const newCount = Object.values(newResolved).filter(v => v).length;
        const oldCount = this._resolvedEntities
          ? Object.values(this._resolvedEntities).filter(v => v).length
          : 0;

        // Only update if we found more entities (avoid unnecessary re-renders)
        if (entityChanged || newCount > oldCount) {
          this._resolvedEntities = newResolved;
        }
      }

      if (entityChanged) {
        this._loadForecast();
      }
    }
  }

  private async _loadForecast(): Promise<void> {
    if (!this.hass || !this.config?.entity || this._forecastLoading) return;
    this._forecastLoading = true;

    try {
      // HA 2024.7+ provides a native websocket command: weather/get_forecasts
      // Fall back to the legacy call_service path for older HA versions.
      const fetchForecast = async (forecastType: string): Promise<any[]> => {
        try {
          const resp = await (this.hass as any).callWS({
            type: 'weather/get_forecasts',
            entity_id: this.config.entity,
            forecast_type: forecastType,
          });
          // Response shape: { [entity_id]: { forecast: [...] } }
          return resp?.[this.config.entity]?.forecast ?? resp?.forecast ?? [];
        } catch {
          // Legacy fallback: call_service + return_response (HA < 2024.7)
          try {
            const wsResp = await (this.hass as any).callWS({
              type: 'call_service',
              domain: 'weather',
              service: 'get_forecasts',
              service_data: { entity_id: this.config.entity, type: forecastType },
              return_response: true,
            });
            return wsResp?.response?.[this.config.entity]?.forecast ?? [];
          } catch {
            return [];
          }
        }
      };

      const [dailyData, hourlyData] = await Promise.all([
        fetchForecast('daily'),
        fetchForecast('hourly'),
      ]);
      this._forecast = dailyData;
      this._hourlyForecast = hourlyData;
    } catch {
      this._forecast = [];
      this._hourlyForecast = [];
    } finally {
      this._forecastLoading = false;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // iOS WEATHER INSPIRED STYLES
  // ═══════════════════════════════════════════════════════════════
  static get styles() {
    return css`
      :host {
        display: block;
        container-type: inline-size;
        --ms-text: var(--primary-text-color, #fff);
        --ms-text-secondary: var(--secondary-text-color, rgba(235, 235, 245, 0.6));
        --ms-accent: #007AFF;
        --ms-card-bg: rgba(255, 255, 255, 0.08);
        --ms-card-border: rgba(255, 255, 255, 0.06);
        --ms-radius: 18px;
        --ms-radius-sm: 12px;
        --ms-font: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
          'Helvetica Neue', 'Segoe UI', Roboto, sans-serif;

        background: var(--ha-card-background, var(--card-background-color, rgba(28, 28, 30, 0.72)));
        backdrop-filter: saturate(180%) blur(20px);
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        border-radius: var(--ms-radius);
        padding: 0;
        font-family: var(--ms-font);
        color: var(--ms-text);
        overflow: hidden;
      }

      /* ── Display mode modifiers ── */
      :host([data-display='compact']) .ms-swiss-section,
      :host([data-display='compact']) .ms-heating-section,
      :host([data-display='compact']) .ms-chart-container {
        display: none !important;
      }
      :host([data-display='compact']) .ms-header { padding: 16px 16px 4px; }
      :host([data-display='compact']) .ms-section { margin: 6px 12px; padding: 10px 12px; }

      /* Auto mode: compact when container is narrow */
      :host([data-display-effective='compact']) .ms-swiss-section,
      :host([data-display-effective='compact']) .ms-heating-section,
      :host([data-display-effective='compact']) .ms-chart-container {
        display: none !important;
      }
      :host([data-display-effective='compact']) .ms-header { padding: 16px 16px 4px; }
      :host([data-display-effective='compact']) .ms-section { margin: 6px 12px; padding: 10px 12px; }

      /* Header — responsive with clamp() */
      .ms-header { text-align: center; padding: 28px 20px 8px; }
      .ms-header-main {
        display: flex; align-items: center; justify-content: center;
        gap: clamp(8px, 3cqw, 20px); margin: 4px 0;
      }
      .ms-location {
        font-size: clamp(20px, 5cqw, 28px); font-weight: 400; letter-spacing: -0.5px;
      }
      .ms-temp {
        font-size: clamp(48px, 14cqw, 72px); font-weight: 200; line-height: 1.1;
        letter-spacing: -2px; margin-top: 2px;
      }
      .ms-temp .ms-temp-unit {
        font-size: 0.45em; font-weight: 300; vertical-align: top;
        margin-left: 2px; opacity: 0.7;
      }
      .ms-condition {
        font-size: 16px; font-weight: 500;
        color: var(--ms-text-secondary); margin-top: -4px;
      }
      .ms-hl {
        font-size: 15px; font-weight: 400;
        color: var(--ms-text-secondary); margin-top: 2px;
      }
      .ms-weather-icon {
        width: clamp(56px, 12cqw, 80px); height: clamp(56px, 12cqw, 80px);
        margin: 0 auto; display: block; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .ms-weather-icon img {
        width: 100% !important; height: 100% !important;
        object-fit: contain; font-size: inherit !important;
      }
      .ms-weather-icon ha-icon {
        --mdc-icon-size: clamp(56px, 12cqw, 80px) !important;
      }

      /* Glass Sections */
      .ms-section {
        background: var(--ms-card-bg);
        border: 0.5px solid var(--ms-card-border);
        border-radius: var(--ms-radius-sm);
        margin: 10px 16px;
        padding: 14px 16px;
      }
      .ms-section-label {
        font-size: 11px; font-weight: 600; text-transform: uppercase;
        letter-spacing: 1px; color: var(--ms-text-secondary);
        margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
      }
      .ms-section-label ha-icon { --mdc-icon-size: 14px; }

      /* Metric Pills */
      .ms-metrics { display: flex; flex-wrap: wrap; gap: 8px; }
      .ms-pill {
        display: flex; align-items: center; gap: 6px;
        padding: 8px 14px;
        background: var(--ms-card-bg);
        border: 0.5px solid var(--ms-card-border);
        border-radius: 20px; font-size: 14px;
      }
      .ms-pill ha-icon { --mdc-icon-size: 16px; opacity: 0.8; }
      .ms-pill-value { font-weight: 600; }
      .ms-pill-label { color: var(--ms-text-secondary); font-size: 12px; }

      /* Swiss Values */
      .ms-swiss-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 10px;
      }
      .ms-swiss-item {
        display: flex; flex-direction: column; align-items: center;
        padding: 10px; background: rgba(255, 255, 255, 0.04);
        border-radius: 10px;
      }
      .ms-swiss-value { font-size: 18px; font-weight: 500; }
      .ms-swiss-label { font-size: 11px; color: var(--ms-text-secondary); margin-top: 2px; }
      .ms-foehn-badge {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 3px 10px; border-radius: 10px;
        font-size: 13px; font-weight: 600;
      }

      /* Heating */
      .ms-hdd { display: flex; align-items: center; justify-content: space-between; }
      .ms-hdd-today { display: flex; align-items: baseline; gap: 4px; }
      .ms-hdd-value { font-size: 22px; font-weight: 400; }
      .ms-hdd-unit { font-size: 12px; color: var(--ms-text-secondary); }
      .ms-hdd-season { font-size: 13px; color: var(--ms-text-secondary); }

      /* Forecast Strip */
      .ms-forecast {
        display: flex; gap: 2px; overflow-x: auto;
        -webkit-overflow-scrolling: touch; scrollbar-width: none;
      }
      .ms-forecast::-webkit-scrollbar { display: none; }
      .ms-forecast-day {
        flex: 1; min-width: 48px;
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; padding: 8px 4px;
      }
      .ms-forecast-weekday { font-size: 13px; font-weight: 600; color: var(--ms-text-secondary); }
      .ms-forecast-icon {
        width: clamp(28px, 7cqw, 36px); height: clamp(28px, 7cqw, 36px);
        display: flex; align-items: center; justify-content: center;
      }
      .ms-forecast-icon img {
        width: 100% !important; height: 100% !important;
        object-fit: contain; font-size: inherit !important;
      }
      .ms-forecast-icon ha-icon {
        --mdc-icon-size: clamp(28px, 7cqw, 36px) !important;
      }
      .ms-forecast-temps { display: flex; flex-direction: column; align-items: center; }
      .ms-forecast-high { font-size: 15px; font-weight: 500; }
      .ms-forecast-low { font-size: 13px; color: var(--ms-text-secondary); }
      .ms-forecast-precip { font-size: 11px; color: var(--ms-accent); opacity: 0.8; }

      /* Chart Container */
      .ms-chart-container { margin: 10px 16px; }

      /* Footer */
      .ms-footer {
        text-align: center; padding: 8px 16px 16px;
        font-size: 11px; color: var(--ms-text-secondary); opacity: 0.5;
      }

      /* Wind Compass */
      .ms-wind-compass { width: 20px; height: 20px; position: relative; display: inline-block; }
      .ms-wind-compass::before {
        content: ''; position: absolute; inset: 0;
        border: 1.5px solid var(--ms-text-secondary);
        border-radius: 50%; opacity: 0.4;
      }
      .ms-wind-arrow {
        position: absolute; top: 50%; left: 50%; width: 0; height: 0;
        border-left: 4px solid transparent; border-right: 4px solid transparent;
        border-bottom: 10px solid var(--ms-accent);
        transform-origin: bottom center; transform: translate(-50%, -100%);
      }

      /* ── Mobile-first responsive ── */
      @media (max-width: 480px) {
        .ms-temp { font-size: clamp(48px, 18vw, 60px); }
        .ms-location { font-size: clamp(20px, 6vw, 24px); }
        .ms-weather-icon { width: clamp(48px, 14vw, 64px); height: clamp(48px, 14vw, 64px); }
        .ms-weather-icon img { width: 100% !important; height: 100% !important; object-fit: contain; }
        .ms-weather-icon ha-icon { --mdc-icon-size: clamp(48px, 14vw, 64px) !important; }
        .ms-swiss-grid { grid-template-columns: 1fr 1fr; }
        .ms-section { margin: 8px 12px; padding: 12px; }
        .ms-pill { padding: 6px 10px; font-size: 13px; }
        .ms-forecast-day { min-width: 42px; }
        .ms-forecast-high { font-size: 14px; }
        .ms-forecast-low { font-size: 12px; }
        .ms-forecast-weekday { font-size: 12px; }
      }

      /* ── Container queries for card width (not viewport) ── */
      @container (max-width: 350px) {
        .ms-temp { font-size: clamp(40px, 16cqw, 52px); }
        .ms-location { font-size: 18px; }
        .ms-weather-icon { width: 48px; height: 48px; }
        .ms-weather-icon img { width: 100% !important; height: 100% !important; }
        .ms-weather-icon ha-icon { --mdc-icon-size: 48px !important; }
        .ms-section { margin: 6px 10px; padding: 10px; }
        .ms-pill { padding: 5px 8px; font-size: 12px; }
        .ms-swiss-grid { grid-template-columns: 1fr 1fr; gap: 6px; }
        .ms-forecast-day { min-width: 38px; padding: 6px 2px; }
        .ms-forecast-icon { width: 26px; height: 26px; }
        .ms-forecast-icon img { width: 100% !important; height: 100% !important; }
        .ms-forecast-icon ha-icon { --mdc-icon-size: 26px !important; }
        .ms-forecast-high { font-size: 13px; }
        .ms-forecast-low { font-size: 11px; }
        .ms-section-label { font-size: 10px; }
      }

      @container (min-width: 600px) {
        .ms-temp { font-size: clamp(64px, 10cqw, 84px); }
        .ms-location { font-size: clamp(24px, 4cqw, 32px); }
        .ms-weather-icon { width: clamp(72px, 14cqw, 96px); height: clamp(72px, 14cqw, 96px); }
        .ms-weather-icon img { width: 100% !important; height: 100% !important; }
        .ms-weather-icon ha-icon { --mdc-icon-size: clamp(72px, 14cqw, 96px) !important; }
        .ms-metrics { justify-content: center; }
        .ms-swiss-grid { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
      }
    `;
  }

  public setConfig(config: CardConfig): void {
    if (!config.entity) throw new Error('Entity required');
    this.config = config;
    setTimeout(() => { this._loadForecast(); }, 500);
  }

  public getCardSize(): number { return 8; }

  public static getStubConfig() {
    return {
      type: 'custom:' + FULL_CARD_NAME,
      entity: '',
      show_location: true,
      location: 'Schweiz',
      show_forecast: true,
      forecast_hours: 6,
      show_temperature: true,
      show_precipitation: true,
      show_sunshine: true,
      show_warnings: true,
      show_wind: true,
      show_swiss: true,
      show_heating: true,
      auto_resolve_entities: true,
      enable_animate_weather_icons: true,
      display_mode: 'full',
      compact_mode: false,
      chart_order: ['temperature', 'precipitation', 'sunshine', 'wind', 'forecast'],
    };
  }

  public static getConfigElement() {
    return document.createElement(FULL_CARD_EDITOR_NAME);
  }

  public static getConfigSchema() { return schema; }

  private _getEntityState(entityId: string): HassEntity | undefined {
    return this.hass?.states[entityId];
  }

  /** Parse entity state to float, returning fallback for unavailable/unknown/NaN */
  private _safeParseFloat(state: string | undefined, fallback: number = NaN): number {
    if (!state || state === 'unavailable' || state === 'unknown') return fallback;
    const n = parseFloat(state);
    return isNaN(n) ? fallback : n;
  }

  private _formatWindDirection(degrees: number): string {
    const dirs = ['N','NNO','NO','ONO','O','OSO','SO','SSO','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    return dirs[Math.round(degrees / 22.5) % 16];
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER — iOS Weather Layout
  // ═══════════════════════════════════════════════════════════════
  public render(): TemplateResult {
    if (!this.hass || !this.config) return html``;

    // Determine effective display mode
    const rawMode = this.config.display_mode || (this.config.compact_mode ? 'compact' : 'full');
    // 'auto' will be handled via attribute; CSS + JS will decide based on container width
    if (rawMode) {
      this.setAttribute('data-display', rawMode);
    }

    // For 'auto' mode, observe container width and switch
    if (rawMode === 'auto' && !this._resizeObserver) {
      this._resizeObserver = new ResizeObserver((entries) => {
        const w = entries[0]?.contentRect?.width ?? 400;
        const effective = w < 350 ? 'compact' : 'full';
        if (this.getAttribute('data-display-effective') !== effective) {
          this.setAttribute('data-display-effective', effective);
          this.requestUpdate();
        }
      });
      this._resizeObserver.observe(this);
    } else if (rawMode !== 'auto' && this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
      this.removeAttribute('data-display-effective');
    }

    // Resolve effective mode for rendering decisions
    const effectiveMode = rawMode === 'auto'
      ? (this.getAttribute('data-display-effective') || 'full')
      : rawMode;
    const isCompact = effectiveMode === 'compact';

    const lang = (this.hass.selectedLanguage || this.hass.language || 'en').substring(0, 2);
    if (lang !== this._loadedLang) {
      this._loadedLang = lang;
      use(lang).then(() => this.requestUpdate());
    }

    const weatherEntity = this._getEntityState(this.config.entity) as WeatherEntity;
    if (!weatherEntity) return html`<div style="padding:20px;">Entity not found: ${this.config.entity}</div>`;

    const condition = weatherEntity.state as WeatherCondition;

    // Auto-resolved or manual entities
    const windEntity = this.config.wind_entity
      ? this._getEntityState(this.config.wind_entity)
      : this._resolvedEntities?.wind_speed
        ? this._getEntityState(this._resolvedEntities.wind_speed)
        : null;
    const windDirectionEntity = this.config.wind_direction_entity
      ? this._getEntityState(this.config.wind_direction_entity)
      : this._resolvedEntities?.wind_direction
        ? this._getEntityState(this._resolvedEntities.wind_direction)
        : null;
    const sunshineEntity = this.config.sunshine_entity
      ? this._getEntityState(this.config.sunshine_entity)
      : this._resolvedEntities?.sunshine_duration
        ? this._getEntityState(this._resolvedEntities.sunshine_duration)
        : null;
    // Temperature: prefer sensor, fall back to weather entity attribute
    const tempSensorVal = this._resolvedEntities?.temperature
      ? this._safeParseFloat(this._getEntityState(this._resolvedEntities.temperature)?.state)
      : NaN;
    const temperature = !isNaN(tempSensorVal)
      ? tempSensorVal
      : (weatherEntity.attributes.temperature ?? 0);

    // Pressure: prefer sensor, fall back to weather entity attribute
    const pressureSensorVal = this._resolvedEntities?.pressure
      ? this._safeParseFloat(this._getEntityState(this._resolvedEntities.pressure)?.state)
      : NaN;

    const windSpeed = windEntity ? this._safeParseFloat(windEntity.state) : (weatherEntity.attributes.wind_speed ?? 0);
    const windDir = windDirectionEntity ? this._safeParseFloat(windDirectionEntity.state) : (weatherEntity.attributes.wind_bearing ?? 0);
    const humidity = weatherEntity.attributes.humidity ?? 0;
    const pressure = !isNaN(pressureSensorVal) ? pressureSensorVal : (weatherEntity.attributes.pressure ?? 0);

    // Forecast high/low for today
    const todayForecast = this._forecast[0];
    const todayHigh = todayForecast?.temperature ?? temperature;
    const todayLow = todayForecast?.templow ?? temperature;

    const showLocation = this.config.show_location !== false;
    const location = this.config.location || _t('location');

    // Warnings
    const warningEntity = this.config.warning_entity
      || (this._resolvedEntities?.any_alert ? this._resolvedEntities.any_alert : undefined);
    const primaryWarningEntity = this.config.primary_warning_entity
      ? this._getEntityState(this.config.primary_warning_entity)
      : null;
    const secondaryWarningEntity = this.config.secondary_warning_entity
      ? this._getEntityState(this.config.secondary_warning_entity)
      : null;
    const tertiaryWarningEntity = this.config.tertiary_warning_entity
      ? this._getEntityState(this.config.tertiary_warning_entity)
      : null;
    const warningEntityState = warningEntity ? this._getEntityState(warningEntity) : null;

    return html`
      ${showLocation ? html`
        <div class="ms-header">
          <div class="ms-location">${location}</div>
          <div class="ms-header-main">
            <div class="ms-weather-icon">
              ${getWeatherIcon(condition, this.config.enable_animate_weather_icons !== false ? 'animated' : 'mdi', undefined, condition !== 'clear-night')}
            </div>
            <div class="ms-temp">${Math.round(temperature)}<span class="ms-temp-unit">°</span></div>
          </div>
          <div class="ms-condition">${_t(condition)}</div>
          <div class="ms-hl">H:${Math.round(todayHigh)}° T:${Math.round(todayLow)}°</div>
        </div>
      ` : ''}

      ${this.config.show_warnings !== false
        ? renderWarningSection(warningEntityState, primaryWarningEntity, secondaryWarningEntity, tertiaryWarningEntity, this._openWarnings, this._toggleWarning, this.hass)
        : ''}

      ${this._renderMetricsSection(windSpeed, windDir, humidity, pressure, sunshineEntity)}

      ${this.config.show_swiss !== false && !isCompact ? this._renderSwissSection() : ''}
      ${this.config.show_heating !== false && !isCompact ? this._renderHeatingSection() : ''}

      ${(this.config.show_temperature !== false || this.config.show_precipitation !== false || this.config.show_sunshine !== false || this.config.show_wind !== false) && !isCompact
        ? html`<div class="ms-chart-container">${this._renderCharts()}</div>`
        : ''}

      ${this.config.show_forecast !== false ? this._renderForecastSection() : ''}

      <div class="ms-footer">MeteoSwiss · ${_t('location')}</div>
    `;
  }

  // ── Metrics as iOS pills ────────────────────────────────────────
  private _renderMetricsSection(
    windSpeed: number, windDir: number, humidity: number,
    pressure: number, sunshineEntity: HassEntity | null | undefined
  ): TemplateResult {
    return html`
      <div class="ms-section">
        <div class="ms-metrics">
          <div class="ms-pill">
            <ha-icon icon="mdi:weather-windy"></ha-icon>
            <span class="ms-pill-value">${Math.round(windSpeed)}</span>
            <span class="ms-pill-label">km/h ${this._formatWindDirection(windDir)}</span>
          </div>
          <div class="ms-pill">
            <ha-icon icon="mdi:water-percent"></ha-icon>
            <span class="ms-pill-value">${humidity}</span>
            <span class="ms-pill-label">%</span>
          </div>
          <div class="ms-pill">
            <ha-icon icon="mdi:gauge"></ha-icon>
            <span class="ms-pill-value">${pressure}</span>
            <span class="ms-pill-label">hPa</span>
          </div>
          ${sunshineEntity
            ? html`<div class="ms-pill">
                <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
                <span class="ms-pill-value">${this._safeParseFloat(sunshineEntity.state, 0).toFixed(1)}</span>
                <span class="ms-pill-label">h Sonne</span>
              </div>`
            : ''}
        </div>
      </div>
    `;
  }

  // ── Swiss section ───────────────────────────────────────────────
  private _renderSwissSection(): TemplateResult {
    if (!this.hass) return html``;
    const foehnEntity = this.config.foehn_entity || this._resolvedEntities?.foehn_index;
    const snowEntity = this.config.snow_entity || this._resolvedEntities?.snow_depth;
    const freezingEntity = this.config.freezing_level_entity || this._resolvedEntities?.freezing_level;
    const foehnVal = foehnEntity ? getNumber(this.hass, foehnEntity) : null;
    const snowVal = snowEntity ? getNumber(this.hass, snowEntity) : null;
    const freezingVal = freezingEntity ? getNumber(this.hass, freezingEntity) : null;
    if (foehnVal === null && snowVal === null && freezingVal === null) return html``;
    const foehn = foehnVal !== null ? foehnInfo(foehnVal) : null;

    return html`
      <div class="ms-section ms-swiss-section">
        <div class="ms-section-label"><ha-icon icon="mdi:flag-variant"></ha-icon> Schweizer Werte</div>
        <div class="ms-swiss-grid">
          ${foehn ? html`
            <div class="ms-swiss-item">
              <div class="ms-foehn-badge" style="background:${foehn.color}22;color:${foehn.color};">${foehn.label}</div>
              <div class="ms-swiss-label">Föhn</div>
            </div>` : ''}
          ${snowVal !== null && snowVal > 0 ? html`
            <div class="ms-swiss-item">
              <div class="ms-swiss-value">${snowVal.toFixed(0)} cm</div>
              <div class="ms-swiss-label">Schnee</div>
            </div>` : ''}
          ${freezingVal !== null ? html`
            <div class="ms-swiss-item">
              <div class="ms-swiss-value">${freezingVal.toFixed(0)} m</div>
              <div class="ms-swiss-label">0°C-Grenze</div>
            </div>` : ''}
        </div>
      </div>
    `;
  }

  // ── Heating section ─────────────────────────────────────────────
  private _renderHeatingSection(): TemplateResult {
    if (!this.hass) return html``;
    const hddEntity = this.config.heating_degree_days_entity || this._resolvedEntities?.heating_degree_days;
    const seasonEntity = this.config.season_heating_entity || this._resolvedEntities?.season_heating_degree_days;
    const hddVal = hddEntity ? getNumber(this.hass, hddEntity) : null;
    const seasonVal = seasonEntity ? getNumber(this.hass, seasonEntity) : null;
    if (hddVal === null && seasonVal === null) return html``;
    const month = new Date().getMonth() + 1;
    if ((month < 10 && month > 4) && hddVal === 0 && seasonVal === 0) return html``;

    return html`
      <div class="ms-section ms-heating-section">
        <div class="ms-section-label"><ha-icon icon="mdi:thermostat"></ha-icon> Heizgradtage</div>
        <div class="ms-hdd">
          <div class="ms-hdd-today">
            <span class="ms-hdd-value">${hddVal !== null ? hddVal.toFixed(1) : '--'}</span>
            <span class="ms-hdd-unit">°C·d heute</span>
          </div>
          ${seasonVal !== null ? html`<div class="ms-hdd-season">Saison: ${seasonVal.toFixed(0)} °C·d</div>` : ''}
        </div>
      </div>
    `;
  }

  // ── Hourly charts (existing dmoo500 charts, restyled container) ─
  private _renderCharts(): TemplateResult[] {
    const charts: TemplateResult[] = [];
    const forecastHours = this.config.forecast_hours ?? 6;
    const tString = (key: string, vars?: Record<string, any>) => `${_t(key, vars)}`;
    const chartOrder = Array.isArray(this.config.chart_order)
      ? [...this.config.chart_order]
      : ['temperature', 'precipitation', 'sunshine', 'wind'];
    const sun_entity = this._getEntityState(this.config.sun_entity || 'sun.sun');
    const weatherEntity = this._getEntityState(this.config.entity) as WeatherEntity;

    for (const chart of chartOrder) {
      if (chart === 'forecast') continue;
      switch (chart) {
        case 'temperature':
          if (this.config.show_temperature !== false && this._hourlyForecast.length > 0)
            charts.push(html`<forecast-temperature-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${forecastHours}
              .show_temperature=${true}
              ._t=${_t}
              .showHoursChartLabel=${(h: number) => showHoursChartLabel(h, tString)}
            ></forecast-temperature-chart>`);
          break;
        case 'precipitation':
          if (this.config.show_precipitation !== false && this._hourlyForecast.length > 0)
            charts.push(html`<precipitation-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${forecastHours}
              .show_precipitation=${true}
              ._t=${_t}
              .showHoursChartLabel=${(h: number) => showHoursChartLabel(h, tString)}
            ></precipitation-chart>`);
          break;
        case 'sunshine':
          if (this.config.show_sunshine !== false && this._hourlyForecast.length > 0)
            charts.push(html`<sunshine-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${forecastHours}
              .show_sunshine=${true}
              .weatherEntity=${weatherEntity}
              .sun_entity=${sun_entity}
              ._t=${_t}
              .showHoursChartLabel=${(h: number) => showHoursChartLabel(h, tString)}
            ></sunshine-chart>`);
          break;
        case 'wind':
          if (this.config.show_wind !== false && this._hourlyForecast.length > 0)
            charts.push(html`<wind-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${forecastHours}
              .show_wind=${true}
              ._t=${_t}
              .showHoursChartLabel=${(h: number) => showHoursChartLabel(h, tString)}
            ></wind-chart>`);
          break;
      }
    }
    return charts;
  }

  // ── Daily forecast as iOS strip ─────────────────────────────────
  private _renderForecastSection(): TemplateResult {
    if (!this._forecast || this._forecast.length === 0) {
      return this._forecastLoading
        ? html`<div class="ms-footer">Lade Vorhersage…</div>`
        : html``;
    }

    const days = this._forecast.slice(0, 7);
    const now = new Date();

    return html`
      <div class="ms-section">
        <div class="ms-section-label"><ha-icon icon="mdi:calendar-month"></ha-icon> 7-Tage Vorhersage</div>
        <div class="ms-forecast">
          ${days.map((day, idx) => {
            const date = new Date(day.datetime);
            const isToday = idx === 0 || date.toDateString() === now.toDateString();
            const weekday = isToday
              ? 'Heute'
              : date.toLocaleDateString(this.hass?.language || 'de', { weekday: 'short' });
            const condition = day.condition as WeatherCondition;
            return html`
              <div class="ms-forecast-day">
                <div class="ms-forecast-weekday">${weekday}</div>
                <div class="ms-forecast-icon">
                  ${getWeatherIcon(condition, this.config.enable_animate_weather_icons !== false ? 'animated' : 'mdi', '32px', true)}
                </div>
                <div class="ms-forecast-temps">
                  <div class="ms-forecast-high">${Math.round(day.temperature ?? 0)}°</div>
                  <div class="ms-forecast-low">${Math.round(day.templow ?? 0)}°</div>
                  ${day.precipitation_probability && day.precipitation_probability > 0
                    ? html`<div class="ms-forecast-precip">${day.precipitation_probability}%</div>`
                    : ''}
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
