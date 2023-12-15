// src/components/WeatherDashboard.ts

export type WeatherData = {
  temperature: number;
  condition: string;
};

export async function fetchWeatherData(this: { message: string; weather: WeatherData | null }) {
  try {
      const response = await fetch('/api/weather');
      const data: WeatherData = await response.json();
      this.weather = data;
  } catch (error) {
      console.error('Error fetching weather data:', error);
      this.message = 'Failed to fetch weather data';
  }
}
