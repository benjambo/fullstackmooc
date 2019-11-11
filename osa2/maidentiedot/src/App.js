import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => (
  <form>
    <div>
      <strong>Find countries:</strong> <input value={props.newFilter}
      onChange={props.handleFilterChange}/>
    </div>
  </form>
)

const Places = (props) => <div>{props.rows}</div>

const App = () => {
  const [ country, setCountry ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ weather, setWeather ] = useState({})
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

    const Mapping = ({ countries }) => {
      const capital = [...countries].filter(country => 
        country.name.toLowerCase().includes(newFilter.toLowerCase()) &&
        newFilter.length > 0).map(state => state.capital)

        const URL = `http://api.weatherstack.com/current?access_key=54972c48e0e735d424167d2796986321&query=${capital}`

      useEffect(() => {
        axios
          .get(URL)
          .then(response => {
            setWeather(response.data)
          })
      }, [URL])

      if(countries.length === 1){
        return (countries.map(value => {
          return (
            <div key={value.name}>
              <h2>{value.name}</h2> 
                <p>Capital: {value.capital}</p>
                <p>Population: {value.population}</p>
              <h2>Languages</h2>
                <ul>
                  {value.languages.map(language => 
                  <li key={language.name}>{language.name}</li>)}
                </ul>
                <br></br>
                <img src={value.flag} alt='Flag' width='180px' height='100'/> 
              <h2>Weather in {value.name}</h2>
                  <p><strong>Temperature: </strong>{weather.current.temperature}</p>
                  <img src={weather.current.weather_icons} alt='Weather' width='180px' height='100'/>
                  <p><strong>Wind: </strong>{weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
            </div>
          )
        }))
      } else {
        return (countries.map(value => {
          return <p key={value.name}>{value.name} 
          <button onClick={() => handleShowClick(value.name)}>show</button></p> 
        }))
      } 
    }

    const rows = () => {
      const list = country.filter(place => 
        place.name.toLowerCase().includes(newFilter.toLowerCase(),0))
      if (list.length > 10) {
        return <p>Too many matches, specify filter more</p>
      } else {
        return <Mapping countries={list}/>
      }
    }

    const handleShowClick = (countries) => {
      setNewFilter(countries)
    }

    const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
    }

    return (
      <div>
        <Filter newFilter={newFilter}
          handleFilterChange={handleFilterChange}/>      
        <Places rows={rows()} />
      </div>
    )
}

export default App;
