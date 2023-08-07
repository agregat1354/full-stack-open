import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    upvoteAnecdote(state, { payload }) {
      state.find((anecdote) => anecdote.id === payload).votes++;
      return state;
    },
    appendAnecdote(state, { payload }) {
      state.push(payload);
      return state;
    },
    setAnecdotes(state, { payload }) {
      return payload;
    },
  },
});

export const { upvoteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};
export default anecdoteSlice.reducer;
