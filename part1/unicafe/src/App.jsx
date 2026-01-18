import React, { useState } from "react";

const Heading = ({ header }) => <h2>{header}</h2>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = (props) => (
    <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const count = good + neutral + bad
    const average = count === 0 ? 0 : (good - bad) / count
    const positive = count === 0 ? 0 : (good / count) * 100

    if (count === 0) {
        return <div>No feedback given</div>
    }

    return (
        <table>
            <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={count} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positive + " %"} />
            </tbody>
        </table>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        const updatedGood = good + 1
        setGood(updatedGood)
    }
    const handleNeutralClick = () => {
        const updatedNeutral = neutral + 1
        setNeutral(updatedNeutral)
    }
    const handleBadClick = () => {
        const updatedBad = bad + 1
        setBad(updatedBad)
    }

    return (
        <div>
            <Heading header='give feedback' />
            <Button handleClick={handleGoodClick} text='good' />
            <Button handleClick={handleNeutralClick} text='neutral' />
            <Button handleClick={handleBadClick} text='bad' />

            <Heading header='statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
}

export default App;