import React, {useEffect, useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newPhone,setNewPhone] = useState('')
    const [ filter,setFilter] = useState('')
    const personsToShow = filter === '' ? persons
        :persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const fetchPersons = ()=>{
        personService.getAll().then(
            response=>{
                console.log(response)
                setPersons(response.data)
            }
        )
    }
    useEffect(fetchPersons, []);

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
            <PersonForm>
                onSubmit={addPerson}
                nameValue={newName}
                onNameChange={handleNameChange}
                phoneValue={newPhone}
                onPhoneChange={handlePhoneChange}
            </PersonForm>

            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} />
        </div>
    )
}

export default App