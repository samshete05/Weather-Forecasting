const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 8001;

// app.set('view engine', 'ejs');
app.get("/weather", async (req, res) => {
    const city = req.query.city?.trim(); //to remove whitespces in city
    // console.log(`Received request for city: ${city}`);
    
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required and cannot be empty.' });
    }
  
    const api_key = "4b261ff019eb59ef063148f2e49782f1";
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`; 
  
    try {
        const result = await axios.get(api_url);
        console.log('Weather data retrieved:', result.data);
        
        let weatherData = result.data;

       
        const cityName = weatherData.name;
        const state = weatherData.sys.country; 
        const temperature = weatherData.main.temp; 
        const condition = weatherData.weather[0].description; 
        const humidity = weatherData.main.humidity; 
        const windSpeed = weatherData.wind.speed; 
        const feelsLike = weatherData.main.feels_like; 
        const visibility = (weatherData.visibility / 1000).toFixed(2); 
        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(); 
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();
  
        // Send weather details as JSON response
        res.json({
            cityName,
            state,
            temperature,
            condition,
            humidity,
            windSpeed: (windSpeed * 3.6).toFixed(2), 
            feelsLike,
            visibility,
            sunrise,
            sunset,
            currentTime,
            currentDate,
        });
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data.message });
        }
   
        res.status(500).json({ error: 'Error fetching weather data, please try again later.' });
    }
});
  
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
