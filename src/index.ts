import { version } from '../package.json';
import { DailyForecastChart } from './charts/daily-forecast-chart';
import { ForecastTemperatureChart } from './charts/forecast-temperature-chart';
import { PrecipitationChart } from './charts/precipitation-chart';
import { SunshineChart } from './charts/sunshine-chart';
import { WindChart } from './charts/wind-chart';
import { DailyForecastDiagram } from './charts/daily-forecast-diagram';
import { MeteoSwissCardEditor } from './cards/full-card/meteoswiss-card-editor';
import { MeteoSwissCard } from './cards/full-card/meteoswiss-card';
import { ForecastDiagramCardEditor } from './cards/forecast-diagram/forecast-diagram-card-editor';
import { ForecastDiagramCard } from './cards/forecast-diagram/forecast-diagram-card';
import { MeteoSwissBGCard } from './cards/animated-background/meteoswiss-bg-card';
import { MeteoSwissBGCardEditor } from './cards/animated-background/meteoswiss-bg-card-editor';
import { TemperatureCard } from './cards/hourly-charts/temperature-card';
import { TemperatureCardEditor } from './cards/hourly-charts/temperature-card-editor';
import { PrecipitationCard } from './cards/hourly-charts/precipitation-card';
import { PrecipitationCardEditor } from './cards/hourly-charts/precipitation-card-editor';
import { SunshineCard } from './cards/hourly-charts/sunshine-card';
import { SunshineCardEditor } from './cards/hourly-charts/sunshine-card-editor';
import { WindCard } from './cards/hourly-charts/wind-card';
import { WindCardEditor } from './cards/hourly-charts/wind-card-editor';
import { WarningCard } from './cards/warnings/warning-card';
import { WarningCardEditor } from './cards/warnings/warning-card-editor';
import { PollenCard } from './cards/pollen/pollen-card';
import { PollenCardEditor } from './cards/pollen/pollen-card-editor';
import {
  TEMPERATURE_CARD_NAME,
  PRECIPITATION_CARD_NAME,
  SUNSHINE_CARD_NAME,
  WIND_CARD_NAME,
} from './cards/hourly-charts/const';
import { WARNING_CARD_NAME } from './cards/warnings/const';
import { POLLEN_CARD_NAME } from './cards/pollen/const';
import { registerCustomCard } from './utils';
import { HomeAssistant } from './types/home-assistant';
import { FORECAST_DIAGRAM_CARD_NAME } from './cards/forecast-diagram/const';
import { FULL_CARD_NAME } from './cards/full-card/const';
import { ANIMATED_BACKGROUND_CARD_NAME } from './cards/animated-background/const';

// Extend Window interface for customCards
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
      getEntitySuggestion?: (
        hass: import('./types/home-assistant').HomeAssistant,
        entityId: string
      ) => unknown;
    }>;
  }
}

const weatherEntitySuggestion = (_type: string) => (_hass: HomeAssistant, entityId: string) => {
  if (entityId.split('.')[0] !== 'weather') return null;
  return { config: { type: `custom:${_type}`, entity: entityId } };
};

registerCustomCard({
  type: FULL_CARD_NAME,
  name: 'MeteoSwiss Diagram Card',
  description:
    'A comprehensive weather card for Home Assistant with Swiss weather warnings and forecasts',
  getEntitySuggestion: weatherEntitySuggestion(FULL_CARD_NAME),
});

registerCustomCard({
  type: FORECAST_DIAGRAM_CARD_NAME,
  name: 'MeteoSwiss Daily Forecast Diagram Card',
  description: 'A card to show daily weather forecast as diagram',
  getEntitySuggestion: weatherEntitySuggestion(FORECAST_DIAGRAM_CARD_NAME),
});
registerCustomCard({
  type: ANIMATED_BACKGROUND_CARD_NAME,
  name: 'MeteoSwiss Animated Background Card',
  description: 'Animated weather background card with current conditions',
  getEntitySuggestion: weatherEntitySuggestion(ANIMATED_BACKGROUND_CARD_NAME),
});
registerCustomCard({
  type: TEMPERATURE_CARD_NAME,
  name: 'MeteoSwiss Temperature Chart Card',
  description: 'Hourly temperature forecast chart as standalone card',
  getEntitySuggestion: weatherEntitySuggestion(TEMPERATURE_CARD_NAME),
});
registerCustomCard({
  type: PRECIPITATION_CARD_NAME,
  name: 'MeteoSwiss Precipitation Chart Card',
  description: 'Hourly precipitation forecast chart as standalone card',
  getEntitySuggestion: weatherEntitySuggestion(PRECIPITATION_CARD_NAME),
});
registerCustomCard({
  type: SUNSHINE_CARD_NAME,
  name: 'MeteoSwiss Sunshine Chart Card',
  description: 'Hourly sunshine duration chart as standalone card',
  getEntitySuggestion: weatherEntitySuggestion(SUNSHINE_CARD_NAME),
});
registerCustomCard({
  type: WIND_CARD_NAME,
  name: 'MeteoSwiss Wind Chart Card',
  description: 'Hourly wind speed & direction chart as standalone card',
  getEntitySuggestion: weatherEntitySuggestion(WIND_CARD_NAME),
});
registerCustomCard({
  type: WARNING_CARD_NAME,
  name: 'MeteoSwiss Warning Card',
  description: 'Standalone weather warning card supporting ranked and legacy warning models',
  getEntitySuggestion: (_hass: HomeAssistant, entityId: string) => {
    if (entityId.split('.')[0] !== 'sensor') return null;
    const id = entityId.toLowerCase();
    if (!id.includes('warning')) return null;
    let entityKey: string;
    if (id.includes('primary')) {
      entityKey = 'primary_warning_entity';
    } else if (id.includes('secondary')) {
      entityKey = 'secondary_warning_entity';
    } else if (id.includes('tertiary')) {
      entityKey = 'tertiary_warning_entity';
    } else {
      entityKey = 'warning_entity';
    }
    return { config: { type: `custom:${WARNING_CARD_NAME}`, [entityKey]: entityId } };
  },
});
registerCustomCard({
  type: POLLEN_CARD_NAME,
  name: 'MeteoSwiss Pollen Card',
  description:
    'Displays current pollen levels for up to 7 pollen types from MeteoSwiss integration',
  getEntitySuggestion: (_hass: HomeAssistant, entityId: string) => {
    if (entityId.split('.')[0] !== 'sensor') return null;
    const id = entityId.toLowerCase();
    if (!id.includes('pollen')) return null;
    const pollenTypes = ['birch', 'grasses', 'alder', 'hazel', 'beech', 'ash', 'oak'];
    const matched = pollenTypes.find(p => id.includes(p));
    if (!matched) return null;
    return { config: { type: `custom:${POLLEN_CARD_NAME}`, [`${matched}_entity`]: entityId } };
  },
});

console.info(
  `%c MeteoSwiss Weather Card %c v${version} `,
  'background: #0093DD; color: white; font-weight: bold;',
  'background: transparent; color: #0093DD;'
);

export {
  MeteoSwissCardEditor,
  MeteoSwissCard,
  ForecastDiagramCardEditor,
  ForecastDiagramCard,
  MeteoSwissBGCardEditor,
  MeteoSwissBGCard,
  TemperatureCard,
  TemperatureCardEditor,
  PrecipitationCard,
  PrecipitationCardEditor,
  SunshineCard,
  SunshineCardEditor,
  WindCard,
  WindCardEditor,
  WarningCard,
  WarningCardEditor,
  PollenCard,
  PollenCardEditor,
  DailyForecastChart,
  ForecastTemperatureChart,
  PrecipitationChart,
  SunshineChart,
  WindChart,
  DailyForecastDiagram,
};
