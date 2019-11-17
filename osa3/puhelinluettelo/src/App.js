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
    const contactObject = {
      name: newName,
      number: newNumber
    }
    setSuccess(`${contactObject.name} was added to phonebook`)
    setTimeout(() => {
      setSuccess(null)
    }, 3000)

    contactService
      .create(contactObject)
        .then(returnedContact => {
          persons.forEach(contact => {
            if(contact.name === newName) {
              contactService.getAll(contactObject)
              .then(reUpdate => {
                const wantToUpdate = window.confirm(`${contact.name} already exists in phonebook, do you wish to replace old number with new one?`)
                if (wantToUpdate) {
                  return (
                    contactService
                      .update(contact.id, contactObject)
                        .then(reUpdate => {
                          contactService
                            .remove(contact.id)
                              .then(reUpdate => {
                                setPersons(persons.splice(reUpdate))
                                contactService.getAll().then(getter => {
                                  setPersons(getter)
                                  setSuccess(`${contact.name}'s number was changed`)
                                  setTimeout(() => {
                                    setSuccess(null)
                                  }, 3000)
                                })
                              })
                          })
                          .catch(error => {
                            contactService.getAll().then(getter => {
                            setError(`the contact '${contact.name}' was already deleted from server`)
                            setTimeout(() => {
                              setError(null)
                            }, 3000)
                          })
                        })
                    )
                } else {
                  contactService
                    .remove(contact.id)
                      .then(deleteContact => {
                        setPersons(persons.splice(deleteContact))
                          contactService.getAll().then(getter => {
                            setPersons(getter)
                          })
                      })
                    .catch(error => {
                      setError(`the contact '${contact.name}' was already deleted from server`)
                      setTimeout(() => {
                        setSuccess(null)
                      }, 3000)
                      })
                }
              })
              
            } else {
              setPersons(persons.concat(returnedContact))
              setNewName('')
              setNewNumber('')
            }
        })
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