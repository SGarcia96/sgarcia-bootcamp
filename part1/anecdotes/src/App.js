import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const handleClickNext = () => setSelected(randomNumber)

  const handleClickVote = () => {
    console.log("points ", points)
    console.log("most voted ", mostVoted)

    const copyPoints = { ...points }
    copyPoints[selected] += 1
    setPoints(copyPoints)

    if (points[selected] > points[mostVoted]) {
      setMostVoted(selected)
    }
  }
  
  //return a random number between 0 to anecdotes.lenght
  let randomNumber = Math.floor(Math.random() * anecdotes.length)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <p>has {points[selected]} votes</p>
      <Button handleClick={handleClickVote} text="votes"  />
      <Button handleClick={handleClickNext} text="next anecdote" />
      <br />
      <h2>Anecdote with most votes</h2>
      {anecdotes[mostVoted]}
    </div>
  )
}

export default App
