import { useState, useEffect } from 'react'
import { getCurrentWeather } from '../services/weather/getCurrentWeather'

export const Weather = ({ capital }) => {

    const [weather, setWeather] = useState();

    useEffect(() => {
        getCurrentWeather(capital)
          .then((weather) => {
            setWeather(weather)
          })
      }, [capital])
      

    if (weather === undefined) {
        return <p>Loading...</p>;
      } else {
        console.log(weather);
        const temp = weather.temperature;
        const conditionURL = weather.weather_icons[0];
        const wind = weather.wind_speed;
        const windDirection = weather.wind_dir;

        return (
          <div>
            <b>temperature</b> {temp} ºC
            <br />
            <img src={conditionURL} alt="Loading..." />
            <br />
            <b>wind </b> {wind} <b> direction</b> {windDirection}
          </div>
        );
      }
}