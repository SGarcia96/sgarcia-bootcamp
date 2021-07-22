import React from "react"

const Header = ({ course }) =>
    <h1>{course.name}</h1>

const Total = (props) => {
    const parts = props.course.parts.map(part => part.exercises) //map crea otro array con los valores de part.exercises
    console.log('The exercises of each parts:', parts)

    return(
        <p><strong>total of {parts.reduce((sum, part) => sum + part)} exercises</strong></p> //return the total on 'sum' whose is the accumulator, part is the currentValue
    )
}

const Part = props =>
    <p>{props.name} {props.exercises}</p>

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(
                part => <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Course = (props) => {  
    console.log(props)  

    return (
        <div>
            <Header course={props.course} />
            <Content course={props.course} />
            <Total course={props.course} />
        </div>
    )
}

export default Course