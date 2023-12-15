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

	// Run the server on the IPv4 loopback address and port 8080
	err := router.Run("127.0.0.1:8080")
	if err != nil {
		fmt.Printf("Failed to start server: %v\n", err)
	}

	// Define a route to fetch weather data
	router.GET("/api/weather", func(c *gin.Context) {
		// Mock weather data for testing
		weatherData := map[string]interface{}{
			"temperature": 25,
			"condition":   "Sunny",
		}
		c.JSON(http.StatusOK, weatherData)
	})

}
