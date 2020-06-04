import React, { useState } from 'react'
import Filter from "./components/Filter"
import Form from "./components/Form"
import People from "./components/People"

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.every((person) => person.name !== newName)) {
            const newPerson = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        } else {
            alert(`${newName} is already added to the phonebook`)
        }
    }

    return (
        <>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterChange} value={newFilter} />
            <h3>Add a new</h3>
            <Form
                onSubmit={addPerson}
                nameHandler={handleNameChange} numberHandler={handleNumberChange}
                name={newName} number={newNumber}
            />
            <h3>Numbers</h3>
            <People people={persons} filterValue={newFilter} />
        </>
    )
}

export default App