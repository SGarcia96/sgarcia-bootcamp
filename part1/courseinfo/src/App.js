import React from 'react'

const Header = ({course}) => <h1>{course}</h1>

const Content = (props) => {
  return (
    <>
    <Part part={props.part[0].name} exercises={props.part[0].exercises} />
    <Part part={props.part[1].name} exercises={props.part[1].exercises} />
    <Part part={props.part[2].name} exercises={props.part[2].exercises} />
    </>
  )
}

const Part = (props) => <p>{props.part}  {props.exercises}</p>

const Total = ({total}) => <p>Number of exercises {total}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ] 
  
  const total = part[0].exercises + part[1].exercises + part[2].exercises

  return (
    <div>
      <Header course={course} />
      <Content part={part} />
      <Total total={total} />
    </div>
  )
}

export default App
