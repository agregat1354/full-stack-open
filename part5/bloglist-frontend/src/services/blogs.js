import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (updatedBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update };
