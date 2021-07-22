import React from 'react'
import { useState } from 'react'
import { Note } from "./components/Note.js"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes) //If we wanted to start with an empty list of notes we would set the initial value as an empty array: useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
 
  const handleChange = (event) => {
  //  console.log(event.target.value) //con event.target.value se obtiene el valor introducido dentro del elemento (input en este caso)
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()  //evita el comportamiento por defecto (de onSummit en este caso)
    console.log('create note')
    
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    console.log(noteToAddToState)

    setNotes(notes.concat(noteToAddToState))  // other option is: setNotes([...notes, noteToAddToState, more to add...etc])
    setNewNote("") //clean the input after create new note
  }

  //if showAll is false, noteToShow will be assigned to a list that only contains notes that have the 'important' property set to true.
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'only important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ul>

      <form onSubmit={handleSubmit}> 
        <input type='text' onChange={handleChange} value={newNote} />
        <button>Create note</button> 
      </form>
    </div>
  )
}

export default App