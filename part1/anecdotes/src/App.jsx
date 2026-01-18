import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)
const VoteCount = ({votes}) =>{
    return(
        <div>
            has {votes} votes
        </div>
    )
}
const Header = ({text}) =>{
    return(
        <div>
            <h2>{text}</h2>
        </div>
    )
}
const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const handleRandomClick = ()=>{
        const randomIndex = Math.floor(Math.random() * anecdotes.length)
        setSelected(randomIndex)
    }
    const handleVoteClick = ()=>{
        const copyVotes = [...votes]
        copyVotes[selected] += 1
        setVotes(copyVotes)
    }
    console.log(votes[selected])
    const maxVotes = Math.max(...votes)
    const mostVotedIndex = votes.indexOf(maxVotes)
    return (
        <div>
            <Header text={"Anecdote of the day"}/>
            {anecdotes[selected]}
            <br/><VoteCount votes={votes[selected]}/>
            <Button handleClick={handleVoteClick} text='vote' />
            <Button handleClick={handleRandomClick} text='next anecdote' />

            <Header text={"Anecdote with most votes"}/>
            {anecdotes[mostVotedIndex]}
            <br/><VoteCount votes={votes[mostVotedIndex]}/>
        </div>
    )
}

export default App