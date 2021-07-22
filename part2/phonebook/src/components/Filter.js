import React from 'react'

export const Filter = ({ newSearch, handleChangeSearch }) => {
    return (
        <form>
        filter shown with 
        <input
            value={newSearch}
            onChange={handleChangeSearch} />
            <br />
        </form> 
    ) 
}

export default Filter;