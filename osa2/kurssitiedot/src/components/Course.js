import React from 'react'

const Header = ({ title }) => <h1>{title.name}</h1>

const Part = ({ part }) => <li key={part.id}>{part.name}: {part.exercises}</li>

const Content = ({ para }) => <ul>{para.parts.map(part => Part(part={part}))}</ul>

const Total = ({ amount }) => {
    const totalAmount = amount.parts.reduce((sum, exercise) => 
    sum + exercise.exercises, 0)

    return <p><strong>total of {totalAmount} exercises</strong></p>
}

const Course = ({ course }) => {    
    const rows = course.map(content =>
        <ul key={content.name}>
            <Header title={content} />
            <Content para={content} />
            <Total amount={content} />
        </ul>
    )

    return rows
}

export default Course