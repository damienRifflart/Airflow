# ![Airflow logo](public/airflow-logo.svg) Airflow

Welcome to **Airflow**, your aviation weather dashboard to quickly access **METAR**, **TAF**, **TEMSI/fronts maps** and **charts** for the past 7-days. Built **by** an aviation lover and **for** aviation lovers ! ✈️

## ✨ Main features
🧭 **Airport search**:
- Search airports by **ICAO**, name, or city.
- Quick selection from major large airports.

📡 **Real-time METAR / TAF**:
- Display of both **RAW** and decoded data.
- Weather details: wind, visibility, temperature, pressure, clouds, flight category.

📊 **Historical weather charts (7 days)**:
- Temperature & dew point.
- Wind & gusts.
- Atmospheric pressure.
- Visibility.

🗺️ **Aviation maps (TEMSI + fronts)**:
- Area selection (France / Europe).
- Hour selection.
- Direct integration from `aviation.meteo.fr`.

🎛️ **User experience**:
- Dark mode / light mode.
- Unit switching (temperature, speed, distance).

## 🚀 Run the project locally
### 1) Requirements
- **Node.js** 20+
- **npm**
- A backend API available at `http://localhost:8000` (`/api/*` routes are proxied by Vite)

### 2) Installation
```bash
npm install
```

### 3) Start in development mode
```bash
npm run dev
```

The app will be available at `http://localhost:5173` and the apis at `http://localhost:8000/api/` (`api/metar/{ICAO}`, `api/taf/{ICAO}`, `api/metarhistory/{ICAO}`).

## ⚠️ Important note about TEMSI / fronts maps

To view the maps, you need a free account on [aviation.meteo.fr](https://aviation.meteo.fr/).
There is no fully open public API for these maps, so authentication on their website is required.

## 🤝 Contributing
Want to improve **Airflow**?

1. **Fork the project**.
2. **Create a branch for your changes**:
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Make your changes and commit**:
   ```bash
   git commit -m "Add a new feature"
   ```
4. **Push your branch**:
   ```bash
   git push origin feature/my-feature
   ```
5. **Open a pull request**.

## 📜 License

Airflow is open-source under the MIT license. See [LICENSE](LICENSE) for more details.