import React from "react";
import CountryInfo from "./CountryInfo";

const CountryList = ({ countries, filterValue, setCountry, country }) => {

    if (country !== null) {
        return (
            <CountryInfo country={country} />
        )
    }

    const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(filterValue.toLowerCase()))

    if (filteredCountries.length === countries.length) {
        return null
    } else if (filteredCountries.length >= 10) {
        return (
            <div>
                Too many matches, please specify another filter.
            </div>
        )
    } else if (filteredCountries.length === 0) {
        return (
            <div>
                No matches, please try again with a different filter.
            </div>
        )
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
        return (
            <div>
                {filteredCountries.map((country, i) =>
                    <li key={country.name}>
                        {country.name}
                        <button id={i} onClick={() => setCountry(country)}>Show</button>
                    </li>
                )}
            </div>
        )
    } else {

        return <CountryInfo country={filteredCountries[0]} />
    }
}

export default CountryList