import { LitElement, html, css, TemplateResult } from 'lit';
import { use, get as _t, registerTranslateConfig } from 'lit-translate';
import { customElement, property } from 'lit/decorators.js';
import { fireEvent } from 'custom-card-helpers';
import type { HomeAssistant, LovelaceCardEditor } from '../../types/home-assistant';
import { translations } from '../../translations';
import { type CardConfig, FULL_CARD_EDITOR_NAME, FULL_CARD_NAME, schema } from './const';

registerTranslateConfig({
  loader: lang => translations[lang],
});

@customElement(FULL_CARD_EDITOR_NAME)
export class MeteoSwissCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public lovelace?: any;
  @property({ attribute: false }) private _config!: CardConfig;

  public setConfig(config: CardConfig): void {
    const clean = { ...config };
    for (const key of Object.keys(clean)) {
      if ((clean as any)[key] === '') delete (clean as any)[key];
    }
    this._config = clean;
    this.requestUpdate();
  }

  static get styles() {
    return css`
      .card-config { padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', sans-serif; }
      .header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--divider-color); }
      .header-title { font-size: 20px; font-weight: 600; }
      .group { margin-bottom: 20px; padding: 12px 0; border-top: 1px solid var(--divider-color); }
      .group-title { font-size: 14px; font-weight: 600; margin-bottom: 8px; }
      ha-form { display: block; margin-bottom: 12px; }
      .preview-config {
        font-family: 'SF Mono', 'Monaco', monospace; font-size: 12px;
        background: var(--code-editor-background-color, rgba(0,0,0,0.05));
        padding: 12px; border-radius: 8px; white-space: pre-wrap;
      }
    `;
  }

  protected render(): TemplateResult {
    if (!this.hass) return html`<div>Loading...</div>`;
    use((this.hass.selectedLanguage || this.hass.language || 'en').substring(0, 2));

    const chartOptions = [
      { key: 'temperature', label: 'Temperature' },
      { key: 'precipitation', label: 'Precipitation' },
      { key: 'sunshine', label: 'Sunshine' },
      { key: 'wind', label: 'Wind' },
      { key: 'forecast', label: 'Forecast' },
    ];
    const chartOrder = Array.isArray(this._config?.chart_order)
      ? this._config.chart_order
      : chartOptions.map(o => o.key);

    const data = {
      entity: this._config?.entity,
      show_location: this._config?.show_location ?? true,
      location: this._config?.location ?? '',
      auto_resolve_entities: this._config?.auto_resolve_entities ?? true,
      sun_entity: this._config?.sun_entity,
      wind_entity: this._config?.wind_entity,
      wind_direction_entity: this._config?.wind_direction_entity,
      sunshine_entity: this._config?.sunshine_entity,
      warning_entity: this._config?.warning_entity,
      show_warnings: this._config?.show_warnings ?? true,
      show_swiss: this._config?.show_swiss ?? true,
      show_heating: this._config?.show_heating ?? true,
      foehn_entity: this._config?.foehn_entity,
      snow_entity: this._config?.snow_entity,
      freezing_level_entity: this._config?.freezing_level_entity,
      heating_degree_days_entity: this._config?.heating_degree_days_entity,
      season_heating_entity: this._config?.season_heating_entity,
      show_forecast: this._config?.show_forecast ?? true,
      forecast_hours: this._config?.forecast_hours ?? 6,
      show_temperature: this._config?.show_temperature ?? true,
      show_precipitation: this._config?.show_precipitation ?? true,
      show_sunshine: this._config?.show_sunshine ?? true,
      show_wind: this._config?.show_wind ?? true,
      enable_animate_weather_icons: this._config?.enable_animate_weather_icons ?? true,
      compact_mode: this._config?.compact_mode ?? false,
      display_mode: this._config?.display_mode ?? 'full',
    };

    const s = (name: string) => schema.find(item => item.name === name);

    return html`
      <div class="card-config">
        <div class="header">
          <div class="header-title">🌦️ MeteoSwiss Weather Card</div>
        </div>

        <div class="group">
          <div class="group-title">General</div>
          <ha-form .hass=${this.hass} .data=${data}
            .schema=${[s('entity'), s('location'), s('show_location'), s('auto_resolve_entities')].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">⚠️ Warnings</div>
          <ha-form .hass=${this.hass} .data=${data}
            .schema=${[s('show_warnings'), s('warning_entity')].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">🇨🇭 Swiss Values</div>
          <ha-form .hass=${this.hass} .data=${data}
            .schema=${[s('show_swiss'), s('foehn_entity'), s('snow_entity'), s('freezing_level_entity')].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">🏠 Heating Degree Days</div>
          <ha-form .hass=${this.hass} .data=${data}
            .schema=${[s('show_heating'), s('heating_degree_days_entity'), s('season_heating_entity')].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">📊 Charts & Forecast</div>
          <ha-form .hass=${this.hass} .data=${data}
            .schema=${[
              s('forecast_hours'), s('show_temperature'), s('show_precipitation'),
              s('show_sunshine'), s('show_wind'), s('show_forecast'),
              s('enable_animate_weather_icons'),
            ].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
          <p style="font-size:11px;color:var(--secondary-text-color);margin-top:4px;">Wind, Sonnenscheindauer und weitere Sensoren werden automatisch erkannt (auto_resolve_entities). Optional überschreibbar unter Advanced.</p>
        </div>

        <div class="group">
          <div class="group-title">🔧 Advanced (Überschreibt Auto-Resolve)</div>
          <ha-form .hass=${this.hass} .data=${data}
            .schema=${[
              s('wind_entity'), s('wind_direction_entity'), s('sunshine_entity'),
            ].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
          <p style="font-size:11px;color:var(--secondary-text-color);">Leer lassen für Auto-Resolve. Nur ausfüllen wenn du manuell überschreiben willst.</p>
        </div>

        <div class="group">
          <div class="group-title">Chart Order</div>
          <ul style="list-style:none;padding:0;margin:0;">
            ${chartOrder.map((key, idx) => {
              const opt = chartOptions.find(o => o.key === key);
              return html`<li style="display:flex;align-items:center;margin-bottom:4px;">
                <span style="flex:1;">${opt?.label || key}</span>
                <button @click=${() => this._moveChart(idx, -1)} ?disabled=${idx === 0}>⬆️</button>
                <button @click=${() => this._moveChart(idx, 1)} ?disabled=${idx === chartOrder.length - 1}>⬇️</button>
              </li>`;
            })}
          </ul>
        </div>

        <div class="group">
          <div class="group-title">Display</div>
          <ha-form .hass=${this.hass} .data=${data}
            .schema=${[s('display_mode'), s('compact_mode')].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
          <p style="font-size:11px;color:var(--secondary-text-color);margin-top:4px;">
            <strong>Full:</strong> Alle Sektionen (Warnungen, Messwerte, Schweizer Werte, Heizgradtage, Charts, Forecast)<br>
            <strong>Compact:</strong> Nur Header + Warnungen + Messwerte + Forecast<br>
            <strong>Auto:</strong> Compact bei schmalen Karten (z.B. auf Mobile), Full auf breiten
          </p>
        </div>

        ${this._config?.entity
          ? html`<div class="group">
              <div class="group-title">📋 YAML Preview</div>
              <div class="preview-config">${this._renderConfigPreview()}</div>
            </div>`
          : ''}
      </div>
    `;
  }

  private _moveChart(idx: number, dir: number) {
    if (!this._config) return;
    const order = [...(this._config.chart_order || ['temperature', 'precipitation', 'sunshine', 'wind', 'forecast'])];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= order.length) return;
    [order[idx], order[newIdx]] = [order[newIdx], order[idx]];
    this._config = { ...this._config, chart_order: order };
    fireEvent(this, 'config-changed', { config: this._config });
    this.requestUpdate();
  }

  private _computeLabel = (schemaItem: any) => {
    const labels: Record<string, string> = {
      entity: _t('config.entity'),
      show_location: _t('config.show_location'),
      location: _t('config.location'),
      auto_resolve_entities: _t('config.auto_resolve_entities') || 'Auto-resolve entities',
      sun_entity: _t('config.sun_entity'),
      wind_entity: _t('config.wind_entity'),
      wind_direction_entity: _t('config.wind_direction_entity'),
      sunshine_entity: _t('config.sunshine_entity'),
      warning_entity: _t('warning.config.warning_entity'),
      show_warnings: _t('warning.config.show_warnings'),
      show_swiss: _t('config.show_swiss') || 'Show Swiss values',
      show_heating: _t('config.show_heating') || 'Show heating degree days',
      foehn_entity: _t('config.foehn_entity') || 'Foehn index entity',
      snow_entity: _t('config.snow_entity') || 'Snow depth entity',
      freezing_level_entity: _t('config.freezing_level_entity') || 'Freezing level entity',
      heating_degree_days_entity: _t('config.heating_degree_days_entity') || 'Heating degree days entity',
      season_heating_entity: _t('config.season_heating_entity') || 'Season heating entity',
      show_forecast: _t('config.show_forecast'),
      forecast_hours: _t('config.forecast_hours'),
      show_temperature: _t('config.show_temperature'),
      show_precipitation: _t('config.show_precipitation'),
      show_sunshine: _t('config.show_sunshine'),
      show_wind: _t('config.show_wind'),
      enable_animate_weather_icons: _t('config.enable_animate_weather_icons'),
      compact_mode: _t('config.compact_mode'),
      display_mode: _t('config.display_mode') || 'Display Mode',
    };
    return labels[schemaItem.name] || schemaItem.name;
  };

  private _computeHelper = (schemaItem: any) => schemaItem.description ? _t(schemaItem.description) : '';

  private _renderConfigPreview(): string {
    const config: any = { ...this._config, type: 'custom:' + FULL_CARD_NAME };
    Object.keys(config).forEach(k => { if (config[k] === undefined || config[k] === '') delete config[k]; });
    return Object.entries(config)
      .map(([k, v]) => typeof v === 'string' ? `${k}: "${v}"` : `${k}: ${v}`)
      .join('\n');
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config) {
      this._config = { type: ('custom:' + FULL_CARD_NAME) as any, entity: '' };
    }
    const keepFields: any = {};
    if (this._config.chart_order !== undefined) keepFields.chart_order = this._config.chart_order;
    const newConfig: CardConfig = {
      ...this._config,
      ...ev.detail.value,
      ...keepFields,
      type: ('custom:' + FULL_CARD_NAME) as any,
    };
    Object.keys(newConfig).forEach(k => {
      if ((newConfig as any)[k] === '' || (newConfig as any)[k] === undefined) delete (newConfig as any)[k];
    });
    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: this._config });
  }
}
