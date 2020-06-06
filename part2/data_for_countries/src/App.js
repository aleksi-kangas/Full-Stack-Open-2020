import React, { useEffect, useState } from 'react';
import axios from 'axios'
import CountryList from "./components/CountryList";

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ filter, setNewFilter ] = useState('')
    const [ country, setCountry ] = useState(null)

    useEffect(() => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then((response) => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
        setCountry(null)
    }

    return (
        <div>
            <Filter handleFilterChange={handleFilterChange} />
            <CountryList countries={countries}
                         filterValue={filter}
                         country={country}
                         setCountry={setCountry}
            />
        </div>
    )
}

const Filter = ({ handleFilterChange, filter }) => {
    return (
        <div>
            Find countries <input onChange={handleFilterChange} value={filter}/>
        </div>
    )
}


export default App
