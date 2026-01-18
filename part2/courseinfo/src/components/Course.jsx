import React from "react";

const Header = ({name})=>{
    return <h2>{name}</h2>
}
const Part = ({name,exercises})=>{
    return (
        <div>
            <h3>
                {name}
            </h3>
            <p>Exercises number is <b>{exercises}</b></p>
        </div>
    )
}
const Content = ({course}) =>{
    return (
        <div>
            {course.parts.map(({name,exercises,id}) =>{
                return <Part name={name} exercises={exercises} id={id}/>
            })}
        </div>
    )
}
const Total = ({course})=>{
    const total = course.parts.reduce((sum,part)=>{
        return sum + part.exercises
    },0)
    return(
        <b>total of {total} exercises</b>
    )
}
const Course = ({course})=>{
    return(
        <div>
            <Header name={course.name}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}
export default Course;

