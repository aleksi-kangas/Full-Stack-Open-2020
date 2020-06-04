import React from 'react'

const Filter = ({ handleFilterChange, filterValue }) => {
    return (
        <div>
            Filter shown with <input onChange={handleFilterChange} value={filterValue} />
        </div>
    )
}

export default Filter