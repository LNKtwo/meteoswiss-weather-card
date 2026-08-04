# 🇨🇭 MeteoSwiss Weather Card

![Version](https://img.shields.io/badge/version-2.3.2-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Country](https://img.shields.io/badge/country-🇨🇭-red) ![HA](https://img.shields.io/badge/Home%20Assistant-2024.7%2B-41BDF5)

A custom Lovelace card for Home Assistant — iOS Weather inspired glassmorphism design, built for Swiss weather data. Optimized for the [LNKtwo/ha-meteoswiss](https://github.com/LNKtwo/ha-meteoswiss) integration.

> **Based on [dmoo500/ha-swissweather-card](https://github.com/dmoo500/ha-swissweather-card)** — big thanks for the excellent foundation.

---

## ✨ Features

### 📱 Responsive Design (v2.3+)
- **Container Queries** — card adapts to its own width, not just viewport
- **Display Mode** — `full` (all sections), `compact` (essentials only), or `auto` (switches based on card width)
- **Fluid Typography** — all fonts and icons scale with `clamp()` — looks great on phone, tablet, and desktop
- **Mobile-first** — optimized for small screens from the ground up

### ⚠️ Weather Warnings
- MeteoSwiss warning levels (1–5) with color-coded badges
- Ranked warning model (primary, secondary, tertiary entities)
- Auto-detected from LNKtwo/ha-meteoswiss — zero config
- Expandable details with validity period, description, and links
- Level 3+ warnings get pulsing animation

### 🌡️ Current Conditions (iOS Style)
- Large temperature display with weather icon
- Wind speed + direction (compass bearing)
- Humidity, pressure, sunshine duration
- Auto-resolved from SwissMetNet sensors

### 🇨🇭 Swiss-Specific Values
- **Föhn-Index** — 0 (none) to 5 (very strong), color-coded badge
- **Snow Depth** — current measurement in cm (hidden when 0)
- **Freezing Level** — 0°C isotherm height in meters
- **Heating Degree Days** — daily and seasonal values (SIA 381/3)

### 📊 Hourly Charts
- **Temperature** — line chart with smooth curves
- **Precipitation** — bar chart with probability
- **Sunshine** — bar chart with sunrise/sunset markers
- **Wind** — speed & direction with compass heading
- Customizable chart order via visual editor

### 📅 7-Day Forecast
- Horizontal strip with animated Meteocons icons
- Min/max temps + precipitation probability per day
- Click any day for details

### 🌸 Pollen
- 7 pollen types: Birch, Grasses, Alder, Hazel, Beech, Ash, Oak
- Color-coded severity (None / Low / Medium / Strong / Very Strong)
- Optional raw particle values (particles/m³)
- Per-type enable/disable in editor

### 🎬 Animated Background Card
A separate card type with cinematic weather backgrounds:
- **Apple Weather style** — rain drops, snow flakes, hail stones, lightning bolts
- **Dynamic sky** — sun rays, drifting clouds (3 depth layers), twinkling stars
- **Photo mode** — overlay weather effects on a scenery image
- **Fog, wind streaks** — atmospheric effects for every condition
- CSS-only animations — no canvas, no WebGL, no dependencies

### 🎨 Design
- **iOS Weather glassmorphism** — frosted glass sections, SF Pro typography
- Theme-aware — automatic dark/light via HA CSS variables
- Backdrop-filter blur for depth
- 125 animated SVG weather icons (Meteocons by basmilius)

---

## ⚠️ Requirements

- [Home Assistant](https://www.home-assistant.io/) **2024.7.0** or later
- [HACS](https://hacs.xyz/) (Home Assistant Community Store)
- [LNKtwo/ha-meteoswiss](https://github.com/LNKtwo/ha-meteoswiss) integration **(recommended)** — SwissMetNet data, warnings, pollen, heating degree days, Föhn index, and more
- Modern browser with ES2022 support (Edge 90+, Chrome 90+, Firefox 90+, Safari 15+)

---

## 📦 Installation

### Via HACS (recommended)

1. Open **HACS** → **Frontend**
2. Click **⋮** → **Custom repositories**
3. Add:
   - **URL:** `https://github.com/LNKtwo/meteoswiss-weather-card`
   - **Category:** `Dashboard`
4. Search for **"MeteoSwiss Weather Card"** → **Install**
5. Reload your dashboard

### Manual

1. Download `meteoswiss-weather-card.js` from the [latest release](../../releases)
2. Copy to: `config/www/custom_cards/meteoswiss-weather-card.js`
3. **Settings → Dashboards → ⋮ → Resources → Add Resource**
   - **URL:** `/local/custom_cards/meteoswiss-weather-card.js`
   - **Type:** `module`
4. Reload dashboard

---

## ⚙️ Configuration

### Minimal

```yaml
type: custom:meteoswiss-card
entity: weather.meteoswiss_home
```

That's it. Everything else is auto-detected.

### Full

```yaml
type: custom:meteoswiss-card
entity: weather.meteoswiss_home
location: "Horw"
show_location: true
display_mode: auto          # full | compact | auto
show_warnings: true
show_swiss: true
show_heating: true
show_temperature: true
show_precipitation: true
show_sunshine: true
show_wind: true
show_forecast: true
enable_animate_weather_icons: true
forecast_hours: 12
auto_resolve_entities: true
```

### Visual Editor

Full visual editor included — no YAML needed. Edit dashboard → Add Card → search **"MeteoSwiss"**.

---

## 📋 Options

### General

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Weather entity (e.g. `weather.meteoswiss_home`) |
| `location` | string | `"Schweiz"` | Displayed location name |
| `show_location` | boolean | `true` | Show location in header |
| `display_mode` | string | `full` | `full` / `compact` / `auto` — controls how much data is shown |
| `auto_resolve_entities` | boolean | `true` | Auto-detect LNKtwo/ha-meteoswiss sensors |

### Display

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show_warnings` | boolean | `true` | Weather warnings section |
| `show_swiss` | boolean | `true` | Swiss values (Föhn, snow, freezing level) |
| `show_heating` | boolean | `true` | Heating degree days section |
| `show_temperature` | boolean | `true` | Hourly temperature chart |
| `show_precipitation` | boolean | `true` | Hourly precipitation chart |
| `show_sunshine` | boolean | `true` | Hourly sunshine chart |
| `show_wind` | boolean | `true` | Hourly wind chart |
| `show_forecast` | boolean | `true` | 7-day forecast strip |
| `enable_animate_weather_icons` | boolean | `true` | Animated SVG icons vs static MDI |
| `forecast_hours` | integer | `6` | Hours in hourly charts (6–18) |
| `compact_mode` | boolean | `false` | Legacy — use `display_mode: compact` instead |

### Entity Overrides (optional)

All sensors are auto-detected. Override only if needed:

| Option | Description |
|--------|-------------|
| `warning_entity` | Weather warning sensor (legacy) |
| `primary_warning_entity` | Primary ranked warning |
| `secondary_warning_entity` | Secondary ranked warning |
| `tertiary_warning_entity` | Tertiary ranked warning |
| `wind_entity` | Wind speed sensor |
| `wind_direction_entity` | Wind direction sensor |
| `sunshine_entity` | Sunshine duration sensor |
| `foehn_entity` | Föhn index sensor |
| `snow_entity` | Snow depth sensor |
| `freezing_level_entity` | Freezing level sensor |
| `heating_degree_days_entity` | Heating degree days sensor |
| `season_heating_entity` | Season heating total sensor |

---

## 🧩 Available Cards

| Card | Type | Description |
|------|------|-------------|
| **Full Card** | `custom:meteoswiss-card` | All-in-one weather dashboard |
| **Animated Background** | `custom:meteoswiss-animated-background-card` | Animated weather background with live effects |
| **Temperature Chart** | `custom:meteoswiss-temperature-card` | Hourly temperature line chart |
| **Precipitation Chart** | `custom:meteoswiss-precipitation-card` | Hourly precipitation bar chart |
| **Sunshine Chart** | `custom:meteoswiss-sunshine-card` | Hourly sunshine + sun times |
| **Wind Chart** | `custom:meteoswiss-wind-card` | Hourly wind speed & direction |
| **Warning Card** | `custom:meteoswiss-warning-card` | Standalone weather warnings |
| **Pollen Card** | `custom:meteoswiss-pollen-card` | Pollen levels for 7 types |
| **Forecast Diagram** | `custom:meteoswiss-forecast-diagram-card` | Daily forecast diagram |

---

## 📱 Display Modes

| Mode | Behavior |
|------|----------|
| **`full`** | All sections visible — warnings, current conditions, Swiss values, heating, charts, forecast |
| **`compact`** | Header + warnings + current conditions + forecast only — no charts, Swiss values, or heating |
| **`auto`** | Automatically switches to compact when card width < 350px (e.g. on mobile), full when wider |

---

## 🌍 Translations

| Language | Status |
|----------|--------|
| 🇩🇪 Deutsch | ✅ Complete |
| 🇬🇧 English | ✅ Complete |
| 🇫🇷 Français | 🔜 Planned |
| 🇮🇹 Italiano | 🔜 Planned |

---

## 🔗 Recommended Integration

This card is optimized for **[LNKtwo/ha-meteoswiss](https://github.com/LNKtwo/ha-meteoswiss)** — provides:

- SwissMetNet station data (293+ stations, 10-min updates)
- Official MeteoSwiss weather warnings (ranked model)
- Measured pollen data (16 stations)
- Heating degree days (SIA 381/3)
- Föhn index, snow depth, freezing level height
- Open-Meteo forecast data
- DE / EN / FR / IT translations

Also works with any standard HA weather entity — Swiss-specific features need LNKtwo sensors.

---

## 🛠️ Development

```bash
git clone https://github.com/LNKtwo/meteoswiss-weather-card.git
cd meteoswiss-weather-card
npm install --legacy-peer-deps
npm run dev          # Dev with watch mode
npm run build        # Production build
npm run type-check   # TypeScript check
```

**Tech Stack:** Lit 3 · TypeScript · Vite · lit-translate · Meteocons

---

## 🙏 Credits

- **[dmoo500](https://github.com/dmoo500)** — Original [ha-swissweather-card](https://github.com/dmoo500/ha-swissweather-card)
- **[LNKtwo](https://github.com/LNKtwo)** — [ha-meteoswiss](https://github.com/LNKtwo/ha-meteoswiss) integration
- **[MeteoSwiss](https://www.meteoswiss.admin.ch/)** — Swiss Federal Office of Meteorology and Climatology
- **[basmilius](https://github.com/basmilius/weather-icons)** — Meteocons animated weather icons
- **[Lit](https://lit.dev/)** — Web Components framework

---

## 📝 License

MIT — see [LICENSE](LICENSE)
