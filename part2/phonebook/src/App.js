import { useState, useEffect } from 'react';
import Filter from './components/Filter'
import FormPerson from './components/FormPerson';
import ListPerson from './components/ListPerson'
import personService from './services/persons/persons';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setNewSearch] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)
 
  useEffect(() => {
    personService.getAll()
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
  }

  const endNotification = () => { 
    setTimeout(()=> {
        setNotificationMessage(null)
      }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(person => person.name === newPerson.name).length > 0) {
      if(window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')){
        const previousPerson = persons.find(person => person.name === newName);

        personService.update(previousPerson.id, newNumber)
            .then(updatedNumber => {
                setPersons(persons.map(
                    person => (person.name === newName ? updatedNumber : person)
                ))
                setNotificationMessage(newName + " changed his number to " + newNumber);
                endNotification();
            })
            .catch((error) => {
                console.error(error);
            })
      };
    }

    else{
      personService.create(newPerson)
        .then(newPerson => {
          setPersons((prevPersons) => prevPersons.concat(newPerson))
    
          setNotificationMessage(newName + " was succesfully added");
          endNotification();
          
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  const handleDeletePerson = (name, id) => {
    return () => {
        if(window.confirm("Delete " + name + " ?")){
            personService.deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id));
                    window.alert("Deleted: " + name);
                    setNewName("");
                    setNewNumber(""); 
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }
  }


  return (
    <div>
      <h1 className='title'>Phonebook</h1>
      <Filter newSearch={newSearch} handleChangeSearch={handleChangeSearch} />
      <Notification message={notificationMessage} />

      <h2>Add a new person</h2>
      <FormPerson 
        handleSubmit={addPerson}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <ListPerson
        persons={persons}
        newSearch={newSearch}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App