import Notification from "./components/Notification.jsx";
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from "./components/Filter.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {initializeAnecdotes} from "./reducers/anecdoteReducer.js";
const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])
  return (
    <div>
        <h2>Anecdotes</h2>
        <Notification />
        <Filter/>
        <AnecdoteList />
        <AnecdoteForm />
    </div>
  )
}

export default App
