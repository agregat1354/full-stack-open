import { useSelector, useDispatch } from "react-redux";
import { upvoteAnecdote, newAnecdote } from "./reducers/anecdoteReducer.js";
import AnecdoteForm from "./components/AnecdoteForm.js";
import AnecdoteList from "./components/AnecdoteList.js";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
