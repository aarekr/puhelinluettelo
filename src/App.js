import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setSearchWord] = useState('')

  const addName = (event) => {
      event.preventDefault()
      const nameObject = {
          name: newName,
          number: newNumber
      }
      let nameAlreadyAdded = false; // nimentarkistus
      for(let i=0; i < persons.length; i++){
          if(newName === persons[i].name){
            nameAlreadyAdded = true
          }
      }
      if(nameAlreadyAdded){ // alert, jos nimi jo lisätty
        alert(`${newName} is already added to phonebook`)
      }
      else{ // lisätään uusi nimi
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
      }
  }
  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }
  const handleSearchWord = (event) => {
      setSearchWord(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} 
              searchWord={searchWord.toLowerCase()} 
              handleSearchWord={handleSearchWord} />
      <h3>Add a new</h3>
      <form onSubmit={addName}>
          <div>Name: 
            <input value={newName} onChange={handleNameChange} />
          </div>
          <div>Number: 
            <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>debug: {newName}</div>
          <div>debug: {newNumber}</div>
          <div><button type="submit">add</button></div>
      </form>

      <h3>Numbers</h3>
        {persons.map((person, i)=>
            <Person key={i} 
                    name={person.name} 
                    number={person.number} />
        )}
    </div>
  )
}

const Person = (props) => {
    return(
        <div>
            {props.name} {props.number} <br />
        </div>
    )
}

const Filter = ({persons, searchWord, handleSearchWord}) => {
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

export default App