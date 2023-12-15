<!-- src/components/WeatherDashboard.ts -->
<div x-data="{ weather: null }" x-init="fetchWeatherData">
    <h1 x-text="weather ? `Temperature: ${weather.temperature}°C, Condition: ${weather.condition}` : 'Loading...'"></h1>

    <script>
        // Specify types for data and fetchWeatherData function
        type WeatherData = { temperature: number; condition: string };

        async function fetchWeatherData(this: { weather: WeatherData | null }) {
            try {
                const response = await fetch('/api/weather');
                const data: WeatherData = await response.json();
                this.weather = data;
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
    </script>
</div>
