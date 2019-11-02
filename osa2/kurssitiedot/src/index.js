import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>
                {props.course.name}
            </h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.allNames} {props.allExercises}
            </p>
        </div>
    )
}
const Content = (props) => {    
    return (
        <div>
            <Part allNames={props.parts.parts[0].name} allExercises={props.parts.parts[0].exercises}/>
            <Part allNames={props.parts.parts[1].name} allExercises={props.parts.parts[1].exercises}/>
            <Part allNames={props.parts.parts[2].name} allExercises={props.parts.parts[2].exercises}/>
        </div>
    )
}

const Total = (props) => {
    let x = 0
    props.parts.parts.forEach(value => {
        x += value.exercises
    })

    return  (
        <div>
            <p>
                Number of exercises {x}
            </p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
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
      }

      const totalAmount = course.reduce((sum, part) => sum + part.exercises, 0)
    console.log(totalAmount)

  return (
    <div>
      <Header course={course} />
      <Content parts={course}/>
      <Total parts={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))