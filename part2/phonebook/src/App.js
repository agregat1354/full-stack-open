import './index.css'
import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

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

const Person = ({ name, number, handleDelete }) => {
  return (
    <p>
      {name} {number} <button onClick={handleDelete}>delete</button>
    </p>
  )
}

const Persons = ({ persons, handleDelete }) => {
  console.log(persons)
  return (
    <>
      {persons.map(person => <Person key={person.id} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)} />)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageTypeClass, setMessageTypeClass] = useState('info')

  useEffect(() => {
    const nonExistantEntry = {
      id: 1000,
      name: "Mark Delete",
      number: "777"
    }
    phonebookService
      .getAll()
      .then(initialPersons => setPersons([...initialPersons, nonExistantEntry]))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const personAlreadyExists = persons.find(elem => elem.name === newName)

    if (personAlreadyExists) {
      if (!window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        return
      } else {
        phonebookService
          .update(personAlreadyExists.id, { ...personAlreadyExists, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
            setMessageTypeClass('info')
            setMessage(`${updatedPerson.name}'s phone number was updated`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      phonebookService
        .create({ name: newName, number: newNumber })
        .then(newPhonebookEntry => {
          setPersons([...persons, newPhonebookEntry])
          setMessageTypeClass('info')
          setMessage(`${newPhonebookEntry.name} was added to phone book`)
          setTimeout(() => [
            setMessage(null)
          ], 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePersonWithId = id => {
    const personToDelete = persons.find(person => person.id === id)
    if (!window.confirm(`Delete ${personToDelete.name}?`)) return

    phonebookService
      .delete(id)
      .then(deletedPerson => setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {
        setPersons(persons.filter(person => person.id !== id))
        setMessageTypeClass('error')
        const personToDelete = persons.find(person => person.id === id)
        setMessage(`Information of ${personToDelete.name} has already been removed from the server`)
        setTimeout(() => setMessage(null), 5000)
        console.log(persons)
      })
  }

  const filteringRegex = new RegExp(filter, "gi")
  const personsToShow = (filter === '') ? persons : persons.filter(person => person.name.match(filteringRegex))

  console.log("persons: ", persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} typeClass={messageTypeClass} />
      <Filter filterValue={filter} handleChange={(e) => setFilter(e.target.value)} />
      <h2>Add new</h2>
      <PersonForm handleSubmit={handleSubmit} nameValue={newName} numberValue={newNumber}
        handleNameChange={e => setNewName(e.target.value)} handleNumberChange={e => setNewNumber(e.target.value)} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={deletePersonWithId} />
    </div>
  )
}

export default App