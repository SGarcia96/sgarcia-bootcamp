import React, { useState } from 'react'

/* Title Component */
const Title = () => <h1>give feedback</h1>

/* Statistic Component */
const Statistics = ({ good, neutral, bad }) => {

  const totalClicks = good + neutral + bad
  const averageClicks = (good - bad) / totalClicks
  const positivePercentage = (good / totalClicks) * 100
  
  if (totalClicks === 0) { 
    return <h2>No feedback given</h2>
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tr>
            good <td>{good}</td>
          </tr>
          <tr>
            neutral <td>{neutral}</td>
          </tr>
          <tr>
            bad <td>{bad}</td>
          </tr>
          <tr>
            total <td>{totalClicks}</td>
          </tr>
          <tr>
            average <td>{averageClicks}</td>
          </tr>
          <tr>
            positive <td>{positivePercentage}</td>
          </tr>
        </table>
      </div>
    )
    }
}

/* Button Component */
const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>
    {text} 
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title />
      <Button handleClick={handleClickGood} text='good' />
      <Button handleClick={handleClickNeutral} text='neutral' />
      <Button handleClick={handleClickBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App