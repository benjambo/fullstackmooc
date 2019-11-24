import React, { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Success from './components/Success'
import Errors from './components/Errors'


const Filter = (props) => (
  <form>
    <div>
      Filter shown with: <input value={props.newFilter}
      onChange={props.handleFilterChange}/>
    </div>
  </form>
)

const PersonForm = (props) => (
  <form onSubmit={props.addContact}>
  <div>
    name: <input value={props.newName}
    onChange={props.handleNameChange}/>
  </div>
  <div>
    number: <input value={props.newNumber}
    onChange={props.handleNumberChange} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)

const People = (props) => <div>{props.rows}</div>

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const rows = () => persons.filter(word => 
    word.name.toLowerCase().includes(newFilter.toLowerCase())).map(contact => {
    return <p key={contact.id}>{contact.name} {contact.number} 
    <button onClick={() => handleRemoveContact(contact)}>delete</button></p>
  })
  const addContact = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      const ok = window.confirm(`${newName} already exists in phonebook, do you want to update number?`)
      if (ok) {
        contactService
          .replace({
            ...existingPerson,
            number: newNumber
          })
          .then(replacedPerson => {
            setPersons(persons.map(p => p.name === newName ? replacedPerson : p))
            setNewName('')
            setNewNumber('')
          })
      }
      return (
        setNewName(''), setNewNumber('')
      )
    }
  contactService
      .create({
        name: newName,
        number: newNumber
      })
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        setSuccess(`Added ${createdPerson.name}`)
        setTimeout(() => {
          setSuccess(null)
        }, 3000)
      })
      .catch(error => {
        setError(`${error.response.data}`)
        console.log(error.response.data)
        setTimeout(() => {
          setError(null)
        }, 2000)
      })
  }

  const handleRemoveContact = (contact) => {
      const wantToRemove = window.confirm(`Delete ${contact.name}`)
      if (wantToRemove) {
        return (
          contactService
            .remove(contact.id)
              .then(deleteContact => {
                contactService
                  .getAll()
                  .then(reUpdate => {
                    setPersons(reUpdate)
                    setSuccess(`${contact.name} was removed from phonebook`)
                    setTimeout(() => {
                      setSuccess(null)
              }, 3000)
            })
          })
        )
      }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={success} />
      <Errors wrong={error} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new contact</h2>
      <PersonForm addContact={addContact} newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Contacts</h2>
      <People rows={rows()} />
    </div>
  )
}

export default App