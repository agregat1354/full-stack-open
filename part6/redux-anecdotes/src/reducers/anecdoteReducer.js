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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(anecdoteSlice.actions.setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(anecdoteSlice.actions.appendAnecdote(newAnecdote));
  };
};

export const upvoteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToUpvote = getState().anecdotes.find(
      (anecdote) => anecdote.id === id
    );
    await anecdoteService.update({
      ...anecdoteToUpvote,
      votes: anecdoteToUpvote.votes + 1,
    });
    dispatch(anecdoteSlice.actions.upvoteAnecdote(id));
  };
};

export default anecdoteSlice.reducer;
