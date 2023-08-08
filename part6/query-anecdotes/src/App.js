import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllAnecdotes, updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();

  const dispatchNotification = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess(updateAnecdote) {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((anecdote) =>
          anecdote.id === updateAnecdote.id ? updateAnecdote : anecdote
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatchNotification({
      type: "CREATE_NOTIFICATION",
      payload: `anecdote ${anecdote.content}' voted`,
    });
    setTimeout(
      () => dispatchNotification({ type: "REMOVE_NOTIFICATION" }),
      5000
    );
  };

  const { isLoading, isError, error, data } = useQuery(
    "anecdotes",
    getAllAnecdotes,
    { retry: false }
  );

  if (isLoading) return <div>loading data...</div>;
  if (isError) return <div>error: {error.message}</div>;

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
