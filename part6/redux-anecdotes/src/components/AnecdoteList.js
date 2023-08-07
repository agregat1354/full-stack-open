import { useSelector, useDispatch } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleUpvote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes} votes</div>
      <button onClick={handleUpvote}>vote</button>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.toSorted((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const handleUpvote = (id) => {
    dispatch(upvoteAnecdote(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleUpvote={() => handleUpvote(anecdote.id)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;