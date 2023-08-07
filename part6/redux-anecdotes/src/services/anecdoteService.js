import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (content) => {
  return axios
    .post(baseUrl, { content, votes: 0 })
    .then((response) => response.data);
};

const update = (updatedAnecdote) => {
  return axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((response) => response.data);
};

export default { getAll, create, update };
