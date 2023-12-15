// server/main.go

package main

import (
	"fmt"
	"net/http"
	"path/filepath"
	"runtime"

	"github.com/gin-gonic/gin"
)

func main() {
	// Get the current directory (to locate static files)
	_, currentFile, _, _ := runtime.Caller(0)
	rootDir := filepath.Dir(currentFile)

	// Define the static files directory
	staticDir := filepath.Join(rootDir, "static")

	// New Gin router
	router := gin.Default()

	// Define a route for the home page
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	// Serve static files from the "static" directory
	router.StaticFS("/static", http.Dir(staticDir))

	// Define a route to fetch weather data
	router.GET("/api/weather", func(c *gin.Context) {
		// Replace "YOUR_API_KEY" with your OpenWeatherMap API key
		apiKey := "YOUR_API_KEY"
		weatherURL := fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=CityName&appid=%s", apiKey)

		// Make a GET request to the OpenWeatherMap API
		response, err := http.Get(weatherURL)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch weather data"})
			return
		}
		defer response.Body.Close()

		// Check if the request was successful (status code 200)
		if response.StatusCode != http.StatusOK {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch weather data"})
			return
		}

		// Parse the JSON response
		var weatherData map[string]interface{}
		if err := response.JSON(&weatherData); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse weather data"})
			return
		}

		c.JSON(http.StatusOK, weatherData)
	})

	// Run the server on the IPv4 loopback address and port 8080
	err := router.Run("127.0.0.1:8080")
	if err != nil {
		fmt.Printf("Failed to start server: %v\n", err)
	}
}
