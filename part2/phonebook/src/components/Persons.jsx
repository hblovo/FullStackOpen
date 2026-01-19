import React from "react";

const Person = ({ person }) => <li>{person.name} {person.phone}</li>
const Persons = ({personsToShow})=>{
    return(
        <ul>
            {/*{persons.map(person=>*/}
            {/*    <Person key={person.name} person={person} />*/}
            {/*)}*/}
            {personsToShow.map(person=><Person key={person.id} person={person} />
            )}
        </ul>
    )
}
export default Persons;