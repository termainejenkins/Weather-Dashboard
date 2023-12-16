// weather-dashboard/src/components/WeatherDashboard.ts

export type WeatherData = { temperature: number; condition: string };

export async function fetchWeatherData(): Promise<WeatherData> {
    try {
        const response = await fetch('/api/weather');
        const data: WeatherData = await response.json();
        console.log('Weather data:', data); // Log the data to check for issues
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data');
    }
}
