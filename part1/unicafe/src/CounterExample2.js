import { useState } from "react"


const App = () => {

 const WarningNotUsed = () => <h1>The counter not used yet</h1>

 const TotalClicks = ({clicks}) => {
     return <p>{clicks.join(', ')}</p>
 }

 const INITIAL_COUNTER_STATE = {
    left: 0,
    right: 0,
    mensaje: 'This is a message from the state'
 }

 const [counters, setCounters] = useState (INITIAL_COUNTER_STATE)

 const [clicks, setClicks] = useState ([])

 const handleClickLeft = () => {
    setCounters ({
        ...counters,
        left: counters.left + 1,
    })
    setClicks(prevClicks => [...prevClicks, 'L'])
}

const handleClickRight = () => {
    setCounters ({
        ...counters,
        right: counters.right + 1,
    })
    setClicks(prevClicks => [...prevClicks, 'R'])
}

const handleClickReset = () => {
    setCounters (INITIAL_COUNTER_STATE)
    setClicks([])
}

  return (
    <div>
      {counters.left}
      <button onClick={handleClickLeft}>Left</button>
      <button onClick={handleClickRight}>Right</button>
      {counters.right}
      <p>{counters.mensaje}</p>
      <p>Clicks totales: {clicks.length}</p>
      <p>
          <button onClick={handleClickReset}>Reset</button>
      </p>
      {clicks.length === 0 
        ? <WarningNotUsed />
        : <TotalClicks clicks={clicks}/>
      }
    </div>
  )
}

export default App;