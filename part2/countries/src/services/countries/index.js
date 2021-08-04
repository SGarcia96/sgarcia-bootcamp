import axios from "axios";
const baseUrl = "https://restcountries.eu/rest/v2/all"

export const getAllCountries = () => {
    return axios
        .get(baseUrl)
        .then(response => {
            return response.data; 
        })
}