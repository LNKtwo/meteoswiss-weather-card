import { PREFIX_NAME } from '../../const';
import { BasicCardConfig } from '../basic';

export const FULL_CARD_NAME = `${PREFIX_NAME}-card`;
export const FULL_CARD_EDITOR_NAME = `${FULL_CARD_NAME}-editor`;

export const schema = [
  {
    name: 'entity',
    required: true,
    description: 'config.descr.entity',
    selector: {
      entity: {
        domain: 'weather',
      },
    },
  },
  {
    name: 'location',
    description: 'config.descr.location',
    selector: {
      text: {},
    },
  },
  {
    name: 'show_location',
    description: 'config.descr.show_location',
    selector: { boolean: {} },
  },
  {
    name: 'wind_entity',
    description: 'config.descr.wind_entity',
    selector: {
      entity: {
        domain: 'sensor',
      },
    },
  },
  {
    name: 'wind_direction_entity',
    description: 'config.descr.wind_direction_entity',
    selector: {
      entity: {
        domain: 'sensor',
      },
    },
  },
  {
    name: 'sunshine_entity',
    description: 'config.descr.sunshine_entity',
    selector: {
      entity: {
        domain: 'sensor',
      },
    },
  },
  {
    name: 'warning_entity',
    description: 'warning.config.descr.warning_entity',
    selector: {
      entity: {
        domain: 'sensor',
      },
    },
  },
  {
    name: 'primary_warning_entity',
    description: 'warning.config.descr.primary_warning_entity',
    selector: {
      entity: {
        domain: 'sensor',
      },
    },
  },
  {
    name: 'secondary_warning_entity',
    description: 'warning.config.descr.secondary_warning_entity',
    selector: {
      entity: {
        domain: 'sensor',
      },
    },
  },
  {
    name: 'tertiary_warning_entity',
    description: 'warning.config.descr.tertiary_warning_entity',
    selector: {
      entity: {
        domain: 'sensor',
      },
    },
  },
  {
    name: 'forecast_hours',
    description: 'config.descr.forecast_hours',
    selector: { number: { min: 6, max: 18, step: 1 } },
  },
  {
    name: 'show_forecast',
    description: 'config.descr.show_forecast',
    selector: { boolean: {} },
  },
  {
    name: 'show_precipitation',
    description: 'config.descr.show_precipitation',
    selector: { boolean: {} },
  },
  {
    name: 'show_temperature',
    description: 'config.descr.show_temperature',
    selector: { boolean: {} },
  },
  {
    name: 'show_sunshine',
    description: 'config.descr.show_sunshine',
    selector: { boolean: {} },
  },
  {
    name: 'show_wind',
    description: 'config.descr.show_wind',
    selector: { boolean: {} },
  },
  {
    name: 'enable_animate_weather_icons',
    description: 'config.descr.enable_animate_weather_icons',
    selector: { boolean: {} },
  },
  {
    name: 'show_warnings',
    description: 'warning.config.descr.show_warnings',
    selector: { boolean: {} },
  },
  {
    name: 'auto_resolve_entities',
    description: 'config.descr.auto_resolve_entities',
    selector: { boolean: {} },
  },
  {
    name: 'show_swiss',
    description: 'config.descr.show_swiss',
    selector: { boolean: {} },
  },
  {
    name: 'show_heating',
    description: 'config.descr.show_heating',
    selector: { boolean: {} },
  },
  {
    name: 'foehn_entity',
    description: 'config.descr.foehn_entity',
    selector: { entity: { domain: 'sensor' } },
  },
  {
    name: 'snow_entity',
    description: 'config.descr.snow_entity',
    selector: { entity: { domain: 'sensor' } },
  },
  {
    name: 'freezing_level_entity',
    description: 'config.descr.freezing_level_entity',
    selector: { entity: { domain: 'sensor' } },
  },
  {
    name: 'heating_degree_days_entity',
    description: 'config.descr.heating_degree_days_entity',
    selector: { entity: { domain: 'sensor' } },
  },
  {
    name: 'season_heating_entity',
    description: 'config.descr.season_heating_entity',
    selector: { entity: { domain: 'sensor' } },
  },
  {
    name: 'display_mode',
    description: 'config.descr.display_mode',
    selector: {
      select: {
        options: [
          { value: 'full', label: 'config.display_mode.full' },
          { value: 'compact', label: 'config.display_mode.compact' },
          { value: 'auto', label: 'config.display_mode.auto' },
        ],
      },
    },
  },
  {
    name: 'compact_mode',
    description: 'config.descr.compact_mode',
    selector: { boolean: {} },
  },
  {
    name: 'chart_order',
    description: 'config.descr.chart_order',
    selector: {
      select: {
        multiple: true,
        options: [
          { value: 'temperature', label: 'config.descr.temperature' },
          { value: 'precipitation', label: 'config.descr.precipitation' },
          { value: 'sunshine', label: 'config.descr.sunshine' },
          { value: 'wind', label: 'config.descr.wind' },
          { value: 'forecast', label: 'config.descr.forecast' },
        ],
      },
    },
  },
];

export type CardConfig = BasicCardConfig & {
  type: typeof FULL_CARD_NAME;
  show_location?: boolean;
  location?: string;
  /** Legacy aggregated warning sensor (LNKtwo/ha-meteoswiss) */
  warning_entity?: string;
  /** Ranked warning model – primary slot (*_primary_weather_warning) */
  primary_warning_entity?: string;
  /** Ranked warning model – secondary slot (*_secondary_weather_warning) */
  secondary_warning_entity?: string;
  /** Ranked warning model – tertiary slot (*_tertiary_weather_warning) */
  tertiary_warning_entity?: string;
  sun_entity?: string;
  wind_entity?: string;
  wind_direction_entity?: string;
  sunshine_entity?: string;
  precipitation_entity?: string;
  show_forecast?: boolean;
  forecast_hours?: number;
  show_hourly?: boolean;
  show_warnings?: boolean;
  show_temperature?: boolean;
  show_precipitation?: boolean;
  show_sunshine?: boolean;
  show_wind?: boolean;
  enable_animate_weather_icons?: boolean;
  compact_mode?: boolean;
  /** 'full' = show everything, 'compact' = minimal view, 'auto' = compact on small screens */
  display_mode?: 'full' | 'compact' | 'auto';
  chart_order?: string[];
  /** LNKtwo/ha-meteoswiss: auto-resolve sensor entities from weather entity */
  auto_resolve_entities?: boolean;
  /** Show Swiss-specific section (foehn, snow, freezing level) */
  show_swiss?: boolean;
  /** Show heating degree days section (SIA 381/3) */
  show_heating?: boolean;
  /** Foehn index entity (auto-resolved if not set) */
  foehn_entity?: string;
  /** Snow depth entity (auto-resolved if not set) */
  snow_entity?: string;
  /** Freezing level entity (auto-resolved if not set) */
  freezing_level_entity?: string;
  /** Heating degree days entity (auto-resolved if not set) */
  heating_degree_days_entity?: string;
  /** Season heating degree days entity (auto-resolved if not set) */
  season_heating_entity?: string;
};
