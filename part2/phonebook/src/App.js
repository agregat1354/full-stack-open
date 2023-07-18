import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filterValue, handleChange }) => (
  <>
    filter: <input value={filterValue} onChange={handleChange} />
  </>
)

const PersonForm = ({ nameValue, handleNameChange, numberValue, handleNumberChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      name: <input value={nameValue} onChange={handleNameChange} />
      <br />
      number: <input value={numberValue} onChange={handleNumberChange} />
      <br />
      <button type="submit">add</button>
    </form>
  )
}

const Person = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.find(elem => elem.name === newName)) {
      alert(`${newName} already exists in the phonebook!`)
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  const filteringRegex = new RegExp(filter, "gi")
  const personsToShow = (filter === '') ? persons : persons.filter(person => person.name.match(filteringRegex))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} handleChange={(e) => setFilter(e.target.value)} />
      <h2>Add new</h2>
      <PersonForm handleSubmit={handleSubmit} nameValue={newName} numberValue={newNumber}
        handleNameChange={e => setNewName(e.target.value)} handleNumberChange={e => setNewNumber(e.target.value)} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App