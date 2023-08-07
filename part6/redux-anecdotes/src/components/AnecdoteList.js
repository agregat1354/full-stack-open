import { useSelector, useDispatch } from "react-redux";
import {
  upvoteAnecdote,
  initializeAnecdotes,
} from "../reducers/anecdoteReducer";
import {
  createNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import { useEffect } from "react";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);
    const filterRegex = new RegExp(`${filter}`);
    return filter
      ? sortedAnecdotes.filter((anecdote) =>
          anecdote.content.match(filterRegex)
        )
      : sortedAnecdotes;
  });

  const handleUpvote = (id) => {
    dispatch(upvoteAnecdote(id));
    const upvotedNotificationContent = anecdotes.find(
      (anecdote) => anecdote.id === id
    ).content;
    dispatch(createNotification(`you voted '${upvotedNotificationContent}'`));
    setTimeout(() => dispatch(removeNotification()), 5000);
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
