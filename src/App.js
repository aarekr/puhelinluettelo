import React, { useEffect, useState } from 'react'
import Filter from './components/Filter.js'
import Person from './components/Person.js'
import axios from 'axios'
import nameService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setSearchWord] = useState('')
  const [ newId, setId ] = useState('')

  useEffect(() => {
    nameService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])

  console.log('render', persons.length, 'persons')

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
        nameService
          .create(nameObject)
          .then(returnedName => {
            setPersons(persons.concat(returnedName))
            setNewName('')
            setNewNumber('')
          })
      }
  }
  const deleteName = (event) => {
    event.preventDefault()
    console.log("Persoonat: ", persons[newId-1].name)
    var r = window.confirm("Delete " + persons[newId-1].name + "?")
    if(r == true){
      axios
        .delete(`http://localhost:3001/persons/${newId}`)
        .then(response => {
          console.log(response)
        })
        nameService
          .getAll()
          .then(initialNames => {
            setPersons(initialNames)
        })
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
  const handleIdChange = (event) => {
    setId(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} 
              searchWord={searchWord.toLowerCase()} 
              handleSearchWord={handleSearchWord}
              newId={newId} deleteName={deleteName} />
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
      <h3>Remove name</h3>
      <form onSubmit={deleteName}>
        <div>What id do you want deleted: <input value={newId} onChange={handleIdChange} />
            <button type="submit">delete</button></div>
      </form>

      <h3>Numbers</h3>
        {persons.map((person, i)=>
            <Person key={i} 
                    name={person.name} 
                    number={person.number} 
                    id = {person.id}
                    onChange={handleIdChange}
                    newId={newId} 
                    deleteName={deleteName} />
        )}
    </div>
  )
}

export default App