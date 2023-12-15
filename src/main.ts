// weather-dashboard/src/main.ts

import './styles/style.css';
import typescriptLogo from './assets/typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.ts';
import { fetchWeatherData } from './components/WeatherDashboard';

// Declare the alpine property on the window object
declare global {
  interface CustomWindow extends Window {
    alpine: {
      fetchWeatherData: () => Promise<any>;
      // Add other properties if needed
    };
  }
}

// Register the fetchWeatherData function globally
(window as unknown as CustomWindow).alpine = { fetchWeatherData };

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://github.com/termainejenkins" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://github.com/termainejenkins" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Weather Dashboard</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
