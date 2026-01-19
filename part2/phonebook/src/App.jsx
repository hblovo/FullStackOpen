import React, { useState } from 'react'

const Person = ({ person }) => <li>{person.name} {person.phone}</li>
const Filter = ({value,onChange})=>{
    return(
        <div>
            filter shown with<input value={value} onChange={onChange}/>
        </div>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newPhone,setNewPhone] = useState('')
    const [ filter,setFilter] = useState('')
    const personsToShow = filter === '' ? persons
        :persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const handleFilterChange = (event)=>{
        setFilter(event.target.value)
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
    }
    const addPerson = (event)=>{
        event.preventDefault()

        const exist = persons.find(person => person.name.trim() === newName.trim())
        if(exist){
            alert(`${newName} is already added to phonebook`)
            return
        }
        const personObject = {
            name:newName,
            phone:newPhone
        }
        setPersons(persons.concat(personObject))
        //empty the input
        setNewName('')
        setNewPhone('')
    }
    console.log('Filtered persons to show:', personsToShow)
    return (
        <div>
            <h1>Phonebook</h1>
            <Filter value={filter} onChange={handleFilterChange} />
            <h2>
                Add a new
            </h2>
            <form onSubmit = {addPerson}>
                <div>
                    name:<input value={newName} onChange={handleNameChange} />
                </div>
                <div>phone
                    phone:<input value={newPhone} onChange={handlePhoneChange} />
                </div>
                <div>
                    <button type="submit">
                        Add
                    </button>
                </div>
            </form>

            <h2>Numbers</h2>
            <ul>
                {/*{persons.map(person=>*/}
                {/*    <Person key={person.name} person={person} />*/}
                {/*)}*/}
                {personsToShow.map(person=><Person key={person.id} person={person} />
                )}
            </ul>
        </div>
    )
}

export default App