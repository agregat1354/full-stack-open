import { useSelector, useDispatch } from "react-redux";
import { upvoteAnecdote, newAnecdote } from "./reducers/anecdoteReducer.js";

const App = () => {
  const anecdotes = useSelector((state) =>
    state.toSorted((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(upvoteAnecdote(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnecdoteContent = e.target.Anecdote.value.trim();
    dispatch(newAnecdote(newAnecdoteContent));
    e.target.Anecdote.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="Anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
