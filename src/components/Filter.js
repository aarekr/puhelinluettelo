import React from 'react'

const Filter = ({persons, searchWord, handleSearchWord, newId, deleteName}) => {
    return(
      <div>filter shown with <input value={searchWord} onChange={handleSearchWord} />
        <div>{persons.filter(person => 
                person.name.toLowerCase().includes(searchWord))
                .map(filteredPerson => (
          <p>{filteredPerson.name} {filteredPerson.number}</p>
          ))}
        </div>
      </div>
    )
}

export default Filter