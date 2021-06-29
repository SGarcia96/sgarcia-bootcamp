import { useState } from "react"

/***** Counter Component *****/
const Counter = ({ number }) => {
  return  <h1>{number}</h1>
}

/****** App Component ******/
const App = () => {
  //useState return a list, which position 0=value, position=1 a method for update the value
  const [contadorValue, updateContador] = useState(0) //0 initial value

  //This is a function helper
  const handleClick = () => {
    updateContador(contadorValue + 1)
  }

  const handleClickReset = () => {
    updateContador(0)
  }

  //see if the contador is even(par) or not even (impar)
  const isEven = contadorValue % 2 === 0

  const messageEven = isEven ? 'es Par' : 'es Impar'

  return (
    <div>
      <p>The value of contador is:</p>
      <Counter number={contadorValue} />
      <p>{messageEven}</p>
      <button 
        onClick={handleClick}>
        Increment
      </button>
      <button 
        onClick={handleClickReset}>
        Reset
      </button>
    </div>
  )
}

export default App;
