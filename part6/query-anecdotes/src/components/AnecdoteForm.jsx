import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import {useNotificationDispatch} from "../NotificationContext.jsx";
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()
    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            dispatch({ type: 'SET', payload: `anecdote '${newAnecdote.content}' created` })
            setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
        },
        onError: (error) => {
            const message = error.response?.data?.error || 'too short anecdote, must have length 5 or more'
            dispatch({ type: 'SET', payload: message })
            setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
        }
    })
    const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

        newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote', content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
