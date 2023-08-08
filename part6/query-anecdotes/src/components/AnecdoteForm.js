import { createAnecdote } from "../requests";
import { useMutation, useQueryClient } from "react-query";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const addAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess(newAnecdote) {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", [...anecdotes, newAnecdote]);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    addAnecdoteMutation.mutate({ content, votes: 0 });
    event.target.anecdote.value = "";
    console.log("new anecdote", content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
