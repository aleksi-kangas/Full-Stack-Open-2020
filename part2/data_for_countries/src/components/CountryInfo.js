import React from "react";

const CountryInfo = ({ country }) => {
    if (country === null) {
        return null
    }

    return (
        <div>
            <h1>{country.name}</h1>
            <ul>
                <li key={country.capital}>Capital: {country.capital}</li>
                <li key={country.population}>Population: {country.population}</li>
            </ul>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.name}>
                        {language.name}
                    </li>
                )}
            </ul>
            <img
                src={country.flag}
                height={100}
                width={100}
                alt={'flag'}
            />
        </div>
    )

}

export default CountryInfo