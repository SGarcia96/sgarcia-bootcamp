import { Country } from './Country'

export const Countries = ({ countries, newSearch }) => {
    return (
        <ul>
            {countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase())).map(country => (
            <Country key={country.name} name={country.name} /> ))}
        </ul>
    )
}