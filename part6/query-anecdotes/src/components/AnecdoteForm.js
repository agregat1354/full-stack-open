import { createAnecdote } from "../requests";
import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const dispatchNotification = useNotificationDispatch();
  const queryClient = useQueryClient();
  const addAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess(newAnecdote) {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", [...anecdotes, newAnecdote]);
    },
    onError(err) {
      dispatchNotification({
        type: "CREATE_NOTIFICATION",
        payload: `${err.response.data.error}`,
      });
      setTimeout(
        () => dispatchNotification({ type: "REMOVE_NOTIFICATION" }),
        5000
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    addAnecdoteMutation.mutate({ content, votes: 0 });
    dispatchNotification({
      type: "CREATE_NOTIFICATION",
      payload: `anecdote '${content}' added`,
    });
    setTimeout(
      () => dispatchNotification({ type: "REMOVE_NOTIFICATION" }),
      5000
    );
    event.target.anecdote.value = "";
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
