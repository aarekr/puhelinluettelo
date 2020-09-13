import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' },
    { name: 'Grace Hopper' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
      event.preventDefault()
      const nameObject = {
          name: newName
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
      }
  }
  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
          <div>Name: 
            <input value={newName} 
              onChange={handleNameChange} />
          </div>
          <div>debug: {newName}</div>
          <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>
        {persons.map((person, i)=>
            <Person key={i} name={person.name} />
        )}
    </div>
  )
}

const Person = (props) => {
    return(
        <div>
            {props.name} <br />
        </div>
    )
}

export default App