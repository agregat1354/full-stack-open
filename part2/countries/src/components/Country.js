import { useState, useEffect } from 'react'
import Weather from './Weather'

const Country = ({ countryName, capital, area, languages, flagSrc, showDetailsInitially, capitalCoords }) => {
    const [showDetails, setShowDetails] = useState(showDetailsInitially)
    const [apiKey, setApiKey] = useState(null)

    useEffect(() => {
        setApiKey(process.env.REACT_APP_WEATHER_API_KEY)
    }, [])

    const imgStyle = {
        borderColor: 'black',
        borderWith: 5,
        borderStyle: 'solid'
    }

    const languageNames = []
    for (const [_, value] of Object.entries(languages)) {
        languageNames.push(value)
    }

    const toggleShowDetails = () => setShowDetails(!showDetails)

    if (!showDetails) {
        return (
            <div>
                {countryName}
                <button onClick={toggleShowDetails}>show</button>
            </div>
        )
    }

    return (
        <div>
            <h1>{countryName}</h1>
            <button onClick={toggleShowDetails}>hide</button>
            {capital.map(capital => <p key={capital}>capital {capital}</p>)}
            <p>area {area}</p>
            <h2>languages</h2>
            <ul>
                {languageNames.map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={flagSrc} style={imgStyle}></img>
            {apiKey !== null
                ? <Weather capitalName={capital} latitude={capitalCoords[0]} longitude={capitalCoords[1]} apiKey={apiKey} />
                : null}
        </div>
    )
}

export default Country