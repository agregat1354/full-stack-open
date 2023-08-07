import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    upvoteAnecdote(state, { payload }) {
      state.find((anecdote) => anecdote.id === payload).votes++;
      return state;
    },
    createAnecdote(state, { payload }) {
      state.push(payload);
      return state;
    },
    setAnecdotes(state, { payload }) {
      return payload;
    },
  },
});

export const { upvoteAnecdote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
