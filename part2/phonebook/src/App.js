import React, { useState, useEffect } from "react"

import peopleService from "./services/people"

import Filter from "./components/Filter"
import Form from "./components/Form"
import People from "./components/People"

const App = () => {
    const [ people, setPeople ] = useState([])
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

    // Fetch data at the start of the application
    useEffect(() => {
        peopleService
            .getAll()
            .then(returnedPeople => {
                setPeople(returnedPeople)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
        }
        // Person does not exist in the phonebook
        if (people.every((person) => person.name.toLowerCase() !== newName.toLowerCase())) {
            peopleService
                .create(newPerson)
                .then(returnedPerson => {
                    setPeople(people.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
        // Person exists already -> update
        else if (window.confirm(`${newPerson.name} is already added to the phonebook,
             replace the old number with a new one?`)) {
            updatePerson(newPerson)
        }
    }

    const updatePerson = (person) => {
        // Find the id of the existing entry and copy it to the new entry
        const id = people.find(p => p.name.toLowerCase() === person.name.toLowerCase()).id
        person = {...person, id: id}

        peopleService
            .update(id, person)
            .then(returnedPerson => {
                setPeople(people.map(p => p.id !== id ? p : returnedPerson))
                setNewName('')
                setNewNumber('')
            })
    }

    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            peopleService
                .deleteEntry(person.id)
                .then()  // ignored
            setPeople(people.filter(p => p.id !== person.id))
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
            <People people={people} filterValue={newFilter} deletePerson={deletePerson}/>
        </>
    )
}

export default App