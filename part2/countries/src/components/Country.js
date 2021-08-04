import { Weather } from "./Weather"

export const Country = ({ name, capital, population, languages, flag }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p>population:  {population}</p>
      <p><strong>languages</strong></p>
      <ul>
        {languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={flag} alt="No flag found" height="250" width="350" />
      <Weather capital={capital} />
    </div>
  )
}