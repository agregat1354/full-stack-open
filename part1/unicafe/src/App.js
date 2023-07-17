import {useState} from 'react'

const StatisticsLine = ({label, value}) => {
  return(
    <tr>
      <td>{label}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good + bad + neutral > 0) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine label="good" value={good}></StatisticsLine>
            <StatisticsLine label="neutral" value={neutral}></StatisticsLine>
            <StatisticsLine label="bad" value={bad}></StatisticsLine>
            <StatisticsLine label="average" value={(good - bad)/(good+bad+neutral)}></StatisticsLine>
            <StatisticsLine label="all" value={good+neutral+bad}></StatisticsLine>
            <StatisticsLine label="positive %" value={good/(neutral+bad+good)*100 + "%"}></StatisticsLine>
          </tbody>
        </table>
      </>
    )
  }
  return(
    <p>No feedback given</p>
  )
}

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementState = (use, value) => () => use(value+1)

  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementState(setGood, good)} text="good"></Button>
      <Button handleClick={incrementState(setNeutral, neutral)} text="neutral"></Button>
      <Button handleClick={incrementState(setBad, bad)} text="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App;
