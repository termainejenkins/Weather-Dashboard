// src/components/WeatherDashboard.ts
export type WeatherData = {
    temperature: number;
    condition: string;
  };
  
  export async function fetchWeatherData(): Promise<WeatherData> {
    try {
      const response = await fetch('/api/weather');
      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error; // Re-throw the error to be handled elsewhere
    }
  }
  