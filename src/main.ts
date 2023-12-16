// weather-dashboard/src/main.ts

import './styles/style.css';
import typescriptLogo from './assets/typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.ts';
import { fetchWeatherData } from './components/WeatherDashboard';

// Declare the alpine property on the window object
declare global {
  interface CustomWindow extends Window {
    alpine?: {
      fetchWeatherData?: () => Promise<any>; // Make fetchWeatherData optional
      // Add other properties if needed
    };
    initAlpine?: () => void; // Declare initAlpine property
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const appContainer = document.querySelector<HTMLDivElement>('#app');

  if (appContainer) {
    // Initialize alpine as an empty object
    const alpine: { fetchWeatherData?: () => Promise<any> } = (window as CustomWindow).alpine || {};
    alpine.fetchWeatherData = fetchWeatherData;

    // Set up Alpine.js
    appContainer.innerHTML = `
      <div x-data="{ weather: { temperature: 0, condition: 'Loading...' }, message: '' }" x-init="initAlpine">
        <h1 x-text="'Temperature: ' + (weather ? weather.temperature + '°C' : 'N/A') + ', Condition: ' + (weather ? weather.condition : 'Unknown')"></h1>
        <p x-text="message"></p>

        <a href="https://github.com/termainejenkins" target="_blank">
          <img src="${viteLogo}" class="logo" alt="Vite logo" />
        </a>
        <a href="https://github.com/termainejenkins" target="_blank">
          <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
        </a>
        
        <div class="card">
          <button id="counter" type="button"></button>
        </div>
        
        <p class="read-the-docs">
          Click on the Vite and TypeScript logos to learn more
        </p>
      </div>
    `;

    // Set up Alpine.js fetchWeatherData globally
    (window as CustomWindow).alpine = alpine;

    // Initialize counter and other logic
    setupCounter(appContainer.querySelector<HTMLButtonElement>('#counter')!);
  } else {
    console.error('#app element not found');
  }
});

// Add an Alpine.js initializer function
(window as CustomWindow).initAlpine = () => {
  // You can put any additional initialization logic here
};
