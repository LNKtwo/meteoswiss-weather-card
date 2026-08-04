// MeteoSwiss Entity Auto-Resolver
// Scans all HA entities and matches against LNKtwo/ha-meteoswiss patterns
// Supports BOTH German and English entity naming conventions

import type { HomeAssistant } from '../types/home-assistant';

export interface MeteoSwissEntityMap {
  temperature?: string;
  humidity?: string;
  wind_speed?: string;
  wind_direction?: string;
  wind_gust?: string;
  pressure?: string;
  precipitation?: string;
  dew_point?: string;
  sunshine_duration?: string;
  global_radiation?: string;
  uv_index?: string;
  snow_depth?: string;
  foehn_index?: string;
  freezing_level?: string;
  soil_temp_5cm?: string;
  soil_temp_10cm?: string;
  soil_temp_20cm?: string;
  pm25?: string;
  pm10?: string;
  nitrogen_dioxide?: string;
  ozone?: string;
  pollen_birch?: string;
  pollen_alder?: string;
  pollen_hazel?: string;
  pollen_beech?: string;
  pollen_ash?: string;
  pollen_oak?: string;
  pollen_grass?: string;
  pollen_mugwort?: string;
  pollen_ragweed?: string;
  heating_degree_days?: string;
  season_heating_degree_days?: string;
  any_alert?: string;
  critical_alert?: string;
  weather?: string;
}

// Entity matching patterns — tried in order, first match wins
// Supports: English keys, German keys, and hybrid forms
// CRITICAL: Order matters! Use exclude patterns to avoid false matches
const SENSOR_PATTERNS: Array<{ key: keyof MeteoSwissEntityMap; patterns: string[]; exclude?: string[] }> = [
  // Temperature — must NOT match bodentemperatur/lufttemperatur_in_X
  { key: 'temperature', patterns: ['_temperatur', '_temperature'], exclude: ['boden', 'soil', 'luft'] },
  { key: 'humidity', patterns: ['luftfeuchtigkeit', 'humidity', 'feuchtigkeit'] },
  { key: 'wind_speed', patterns: ['windgeschwindigkeit', 'wind_speed'] },
  { key: 'wind_direction', patterns: ['windrichtung', 'wind_direction'] },
  { key: 'wind_gust', patterns: ['windboe', 'wind_gust', 'boee'] },
  { key: 'pressure', patterns: ['luftdruck', 'pressure'] },
  { key: 'precipitation', patterns: ['niederschlag', 'precipitation', 'regenmenge'] },
  { key: 'dew_point', patterns: ['taupunkt', 'dew_point'] },
  { key: 'sunshine_duration', patterns: ['sonnenscheindauer', 'sunshine_duration'] },
  { key: 'global_radiation', patterns: ['globalstrahlung', 'global_radiation'] },
  { key: 'uv_index', patterns: ['uv_index', 'uvindex'] },
  { key: 'snow_depth', patterns: ['schneehohe', 'schneehöhe', 'snow_depth'] },
  { key: 'foehn_index', patterns: ['fohnindex', 'foehn_index', 'foehn'] },
  // Soil temps — must be checked BEFORE generic temperature
  // Substring matching is intentional: 'bodentemperatur_5' matches 'bodentemperatur_5_cm' in DE entity IDs
  { key: 'soil_temp_5cm', patterns: ['bodentemperatur_5', 'soil_temperature_5'] },
  { key: 'soil_temp_10cm', patterns: ['bodentemperatur_10', 'soil_temperature_10'] },
  { key: 'soil_temp_20cm', patterns: ['bodentemperatur_20', 'soil_temperature_20'] },
  { key: 'pm25', patterns: ['pm2_5', 'pm25', 'feinstaub_pm2'] },
  { key: 'pm10', patterns: ['pm10', 'feinstaub_pm10'] },
  { key: 'nitrogen_dioxide', patterns: ['stickstoffdioxid', 'nitrogen_dioxide', 'no2'] },
  { key: 'ozone', patterns: ['ozon', 'ozone'] },
  // Pollen
  { key: 'pollen_birch', patterns: ['birch_pollen', 'birkenpollen', 'pollen_birch'] },
  { key: 'pollen_alder', patterns: ['alder_pollen', 'erlenpollen', 'pollen_alder'] },
  { key: 'pollen_grass', patterns: ['grass_pollen', 'graserpollen', 'pollen_grass', 'pollen_grasses'] },
  { key: 'pollen_mugwort', patterns: ['mugwort_pollen', 'beifusspollen', 'pollen_mugwort'] },
  { key: 'pollen_ragweed', patterns: ['ragweed_pollen', 'ambrosiapollen', 'pollen_ambrosia', 'pollen_ragweed'] },
  { key: 'pollen_hazel', patterns: ['haselpollen', 'hazel_pollen', 'pollen_hazel'] },
  { key: 'pollen_beech', patterns: ['buchenpollen', 'beech_pollen', 'pollen_beech'] },
  { key: 'pollen_ash', patterns: ['eschenpollen', 'ash_pollen', 'pollen_ash'] },
  { key: 'pollen_oak', patterns: ['eichenpollen', 'oak_pollen', 'pollen_oak'] },
  // Heating
  { key: 'heating_degree_days', patterns: ['heizgradtage'] },
  { key: 'season_heating_degree_days', patterns: ['heizgradtage_saison', 'season_hgt'] },
];

export function resolveMeteoSwissEntities(
  hass: HomeAssistant,
  weatherEntityId: string
): MeteoSwissEntityMap {
  const result: MeteoSwissEntityMap = {};

  if (!hass?.states) return result;

  const allEntityIds = Object.keys(hass.states);

  // Extract station hint from weather entity more robustly
  // Entity IDs are slugified device names: 'MeteoSwiss Luzern' → 'weather.meteoswiss_luzern'
  // 'MeteoSwiss Zürich (SMA)' → 'weather.meteoswiss_zurich_sma'
  // HA may append _<digits> disambiguator: 'weather.meteoswiss_luzern_2'
  const weatherMatch = weatherEntityId.match(/^weather\.meteoswiss_(.+)$/);
  let stationHint = weatherMatch ? weatherMatch[1] : '';
  // Strip trailing _<number> disambiguator (e.g., '_2' added by HA)
  stationHint = stationHint.replace(/_\d+$/, '');

  for (const { key, patterns, exclude } of SENSOR_PATTERNS) {
    let bestMatch: string | undefined;

    for (const entityId of allEntityIds) {
      const lower = entityId.toLowerCase();
      if (!lower.startsWith('sensor.')) continue;

      // Check excludes
      if (exclude && exclude.some(ex => lower.includes(ex))) continue;

      const matchesPattern = patterns.some(p => lower.includes(p));
      if (!matchesPattern) continue;

      // Skip season when looking for daily and vice versa
      if (key === 'heating_degree_days' && (lower.includes('saison') || lower.includes('season'))) continue;
      if (key === 'season_heating_degree_days' && !lower.includes('saison') && !lower.includes('season')) continue;

      // Score by station match
      if (stationHint && lower.includes(stationHint)) {
        bestMatch = entityId;
        break;
      }
      if (!bestMatch) bestMatch = entityId;
    }

    if (bestMatch) (result as any)[key] = bestMatch;
  }

  // Alerts — binary_sensor pattern
  // EN: binary_sensor.meteoswiss_luzern_weather_alert / critical_weather_alert
  // DE: binary_sensor.meteoswiss_luzern_wetterwarnung / kritische_wetterwarnung
  for (const entityId of allEntityIds) {
    const lower = entityId.toLowerCase();
    if (!lower.startsWith('binary_sensor.')) continue;

    const isCritical = lower.includes('critical') || lower.includes('kritisch');
    const isAlert = lower.includes('alert') || lower.includes('warnung');

    if (isCritical && isAlert) {
      result.critical_alert = entityId;
    } else if (isAlert && !result.any_alert) {
      result.any_alert = entityId;
    }
  }

  // Weather entity
  if (hass.states[weatherEntityId]) {
    result.weather = weatherEntityId;
  }

  return result;
}

/** Count how many entities in the map are resolved (non-undefined) */
export function countResolved(map: MeteoSwissEntityMap): number {
  return Object.values(map).filter(v => v !== undefined).length;
}

export function getNumber(hass: HomeAssistant, entityId?: string): number | null {
  if (!entityId || !hass.states[entityId]) return null;
  const s = hass.states[entityId].state;
  if (s === 'unavailable' || s === 'unknown') return null;
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

export function getString(hass: HomeAssistant, entityId?: string): string | null {
  if (!entityId || !hass.states[entityId]) return null;
  const s = hass.states[entityId].state;
  if (s === 'unavailable' || s === 'unknown') return null;
  return s;
}

export function getAttrs(hass: HomeAssistant, entityId?: string): Record<string, any> | null {
  if (!entityId || !hass.states[entityId]) return null;
  return hass.states[entityId].attributes ?? null;
}

export function foehnInfo(code: number): { label: string; color: string } {
  const levels = [
    { label: 'Kein Föhn', color: '#4CAF50' },
    { label: 'Stationär', color: '#8BC34A' },
    { label: 'Möglicher Föhn', color: '#FFC107' },
    { label: 'Gemischter Föhn', color: '#FF9800' },
    { label: 'Föhn', color: '#FF5722' },
    { label: 'Starker Föhn', color: '#f44336' },
  ];
  return levels[code] || levels[0];
}

export function pollenNumberToLevel(n: number): string {
  const map = ['NONE', 'LOW', 'MEDIUM', 'STRONG', 'VERY_STRONG'];
  return map[Math.min(4, Math.max(0, n))] || 'NONE';
}
