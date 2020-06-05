import React from "react"
import Person from "./Person"

const People = ({ people, filterValue, deletePerson }) => {

    const peopleToShow = people.filter((person) =>
        person.name.toLowerCase().includes(filterValue.toLowerCase()))

    return (
        <div>
            {peopleToShow.map((person) =>
                <Person key={person.name} person={person} deletePerson={deletePerson}/>
            )}
        </div>
    )
}

export default People