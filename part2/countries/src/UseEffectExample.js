import React, { useEffect } from 'react'
import { useState } from 'react'
import { Note } from "./components/Notes"
import { getAllNotes } from './services/notes/getAllNotes'
import { createNote } from './services/notes/createNote'

const Example = () => {
  const [notes, setNotes] = useState([]) //If we wanted to start with an empty list of notes we would set the initial value as an empty array: useState([])
  const [newNote, setNewNote] = useState("")
  const [loading, setLoading] = useState(false)
 
  useEffect(() => {
    console.log("useEffect render")
    setLoading(true)

    /** Getting data from web */
    /** fetch 
     * fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())  //transform response to json
      .then((json) => {
          console.log("json: ", json)
          setNotes(json) 
          setLoading(false)
      })
    */

    //  axios
    getAllNotes()
    .then(notes => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])


  const handleChange = (event) => {
  //  console.log(event.target.value) //con event.target.value se obtiene el valor introducido dentro del elemento (input en este caso)
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()  //evita el comportamiento por defecto (de onSummit en este caso)
    
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    }

    createNote(noteToAddToState)
      .then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote)) // other option is: setNotes([...notes, noteToAddToState, more to add...etc])
    })
    .catch((e) => {
      console.error(e)
    })

    setNewNote("") //clean the input after create new note
  }

  return (
    <div>
      <h1>Notes</h1>
      {loading ? 'Loading...' : ''}
      <ul>
        {notes.map((note) => (
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

export default Example