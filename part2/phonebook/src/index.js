import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import Filter from './components/Filter'
import FormPerson from './components/FormPerson';
import ListPerson from './components/ListPerson'
import { getAllNotes } from './services/persons/getAllPersons';

/** Title Component */
const Title = ({ title }) => <h1>{title}</h1>

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setNewSearch] = useState("")

  /****************** CONNECT SERVER ************/
  useEffect(() => {
    getAllNotes()
      .then(persons => {
        setPersons(prevPersons => prevPersons.concat(persons))
      })
  }, [])
  

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeSearch = (event) => {
    setNewSearch(event.target.value)
    console.log("newSearch ", newSearch)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personToAdd = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(person => person.name === personToAdd.name).length > 0) {
      window.alert(newName + ' is already added to phonebook')
    }
    else{
      setPersons([...persons, personToAdd])
      setNewName('') //clear the input
      setNewNumber('') //clear the input
    }
  }


  return (
    <div>
      <Title title={"Phonebook"} />
      <Filter newSearch={newSearch} handleChangeSearch={handleChangeSearch} />

      <Title title={"add a new person"} />
      <FormPerson 
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <Title title={"Numbers"} />
      <ListPerson persons={persons} newSearch={newSearch} />
    </div>
  )
}


ReactDOM.render(
    <App />,
  document.getElementById('root')
);



/**This is for FormExample.js 
const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]
*/
