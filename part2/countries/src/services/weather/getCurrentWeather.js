import axios from "axios";

const api_key = process.env.REACT_APP_WEATHER_API_KEY;

export const getCurrentWeather = async capital => {
    const baseUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
    
    return axios
        .get(baseUrl)
        .then(response => {
            return response.data.current; 
        })
}