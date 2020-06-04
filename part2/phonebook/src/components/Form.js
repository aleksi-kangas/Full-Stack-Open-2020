import React from "react"

const Form = ({ onSubmit, nameHandler, numberHandler, name, number }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                Name: <input onChange={nameHandler} value={name} />
            </div>
            <div>
                Number: <input onChange={numberHandler} value={number} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default Form