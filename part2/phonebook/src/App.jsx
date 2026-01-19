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
            // alert(`${newName} is already added to phonebook`)
            // return
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                const changedPerson = {...exist,number:newPhone}
                personService.update(changedPerson.id,changedPerson).then(
                    //person is a returned new object
                    person=>{
                        setPersons(persons.map(
                            p => p.id !== exist.id ? p : person

                        ))
                        setNewName('')
                        setNewPhone('')
                    }
                )
            }
            return
        }
        const personObject = {
            name:newName,
            number:newPhone
        }
        personService.create(personObject).then(
            person=>{
                setPersons(persons.concat(person))
                setNewName('')
                setNewPhone('')
            }
        )
    }
    const deletePerson = (id)=>{
        personService.remove(id).then(()=>{
            setPersons(persons.filter(person => person.id !== id))
        })
    }
    // console.log('Filtered persons to show:', personsToShow)
    return (
        <div>
            <h1>Phonebook</h1>
            <Filter value={filter} onChange={handleFilterChange} />
            <h2>
                Add a new
            </h2>
            <PersonForm
                onSubmit={addPerson}
                nameValue={newName}
                onNameChange={handleNameChange}
                phoneValue={newPhone}
                onPhoneChange={handlePhoneChange}
            />

            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default App