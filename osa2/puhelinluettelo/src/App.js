import React, { useState } from 'react'

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

const People = (props) => <ul>{props.rows}</ul>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567'},
    { name: 'Berta Jackin', number: '045-7654321'},
    { name: 'Charlie Angel', number: '040-1632345'},
    { name: 'Bill Cage', number: '045-752514'},
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const rows = () => persons.filter(word => 
    word.name.toLowerCase().includes(newFilter.toLowerCase())).map(contact => {
    return <li key={contact.name}>{contact.name} {contact.number}</li>
  })


  const addContact = (event) => {
    event.preventDefault()
    persons.forEach(contact => {
      if(contact.name === newName || contact.number === newNumber) {
        alert(`name: ${newName} or number: ${newNumber} already added to phonebook`)
        const nameObject = {
          name: newName
        }
        setPersons(persons.splice(nameObject))
        setNewName('')
        setNewNumber('')
      } else {
          const contactObject = {
          name: newName,
          number: newNumber
        }
        setPersons(persons.concat(contactObject))
        setNewName('')
        setNewNumber('')
      }
    })
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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add new contact</h2>
      <PersonForm addContact={addContact} newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Contacts</h2>
      <People rows={rows()}/>
    </div>
  )

}

export default App