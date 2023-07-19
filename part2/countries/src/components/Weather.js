import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ latitude, longitude, capitalName, apiKey }) => {
    const [weatherForecastObject, setWeatherForecastObject] = useState(null)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
            .then(response => setWeatherForecastObject(response.data))
            .catch(error => console.log(error))
    }, [])

    console.log(weatherForecastObject)

    if (weatherForecastObject === null) return null

    return (
        <>
            <h1>Weather in {capitalName}</h1>
            <p>temperature {weatherForecastObject.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherForecastObject.weather[0].icon}@2x.png`} ></img>
            <p>wind {weatherForecastObject.wind.speed} m/s</p>
        </>
    )
}

export default Weather