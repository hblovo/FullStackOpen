import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {clearNotification, setNotification} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        const filtered = anecdotes.filter(a =>
            a.content.toLowerCase().includes(filter.toLowerCase())
        )
        return [...filtered].sort((a, b) => b.votes - a.votes)
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList