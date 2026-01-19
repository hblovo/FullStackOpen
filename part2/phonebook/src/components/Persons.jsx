import React from "react";
import DeleteButton from "./DeleteButton.jsx";

const Person = ({ person,deletePerson }) =>(
    <li>
        {person.name} {person.phone}
        <DeleteButton
            name={person.name}
            onClick={()=>{
                deletePerson(person.id,person.name)
            }}>
        </DeleteButton>
    </li>
)
const Persons = ({personsToShow,deletePerson})=>{
    return(
        <ul>
            {personsToShow.map(person=>
                <Person
                    key={person.id} person={person}
                    deletePerson={deletePerson}
                />
            )}
        </ul>
    )
}
export default Persons;