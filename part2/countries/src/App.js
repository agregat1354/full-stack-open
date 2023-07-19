import axios from 'axios'
import { useState, useEffect } from 'react'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleChange = e => setSearch(e.target.value)

  const countryFilterRegex = new RegExp(`${search}`, 'gi')
  const countriesToShow = countries.filter(country => country.name.common.match(countryFilterRegex))
  const singleCountryObject = countriesToShow.length === 1 ? countriesToShow[0] : null

  return (
    <>
      find countries <input value={search} onChange={handleChange} />
      <br />
      {countriesToShow.length > 10
        ? <p>Too many matches, specify another filter</p>
        : countriesToShow.length === 1
          ?
          <Country
            countryName={singleCountryObject.name.common}
            capital={singleCountryObject.capital}
            area={singleCountryObject.area}
            languages={singleCountryObject.languages}
            flagSrc={singleCountryObject.flags.png}
            showDetailsInitially={true}
          />
          :
          countriesToShow.map(country =>
            <Country
              key={country.name.common}
              countryName={country.name.common}
              capital={country.capital}
              area={country.area}
              languages={country.languages}
              flagSrc={country.flags.png}
              showDetailsInitially={false}
            />
          )
      }
    </>
  );
}

export default App;
