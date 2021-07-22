import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAllCountries } from './services/countries/index'
import { FilterCountries } from './components/FIlterCountries'
import { Countries } from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState("")
 
  //Get API countries
  useEffect(() => {
    getAllCountries()
      .then((countries) => {
        setCountries(countries)
      })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h1>Countries</h1>
      <FilterCountries newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Countries countries={countries} newSearch={newSearch} />
    </div>
  )
}

export default App
