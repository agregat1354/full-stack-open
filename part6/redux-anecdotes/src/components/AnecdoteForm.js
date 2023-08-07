import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.Anecdote.value.trim();
    dispatch(createAnecdote(content));
    dispatch(createNotification(`new anecdote added succesfully`));
    setTimeout(() => dispatch(removeNotification()), 5000);
    e.target.Anecdote.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
