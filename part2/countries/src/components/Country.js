import { useState } from 'react'

const Country = ({ countryName, capital, area, languages, flagSrc, showDetailsInitially }) => {
    const [showDetails, setShowDetails] = useState(showDetailsInitially)

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
        </div>
    )
}

export default Country