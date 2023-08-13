/* eslint-disable quotes */
/* eslint-disable semi */
import PropTypes from "prop-types";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogFormSubmission = (e) => {
    e.preventDefault();
    setTitle("");
    setAuthor("");
    setUrl("");
    createBlog({ title, author, url });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogFormSubmission}>
        <Stack style={{ width: 300 }} spacing={2}>
          <TextField
            variant="outlined"
            label="title"
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title of the blog"
          />
          <TextField
            variant="outlined"
            label="author"
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="blog's author"
          />
          <TextField
            variant="outlined"
            label="url"
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="e.g https://www.blogs.com/exampleBlog"
          />
          <Button style={{ width: 150 }} variant="contained" type="submit">
            add blog
          </Button>
        </Stack>
      </form>
    </div>
  );

  /*
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogFormSubmission}>
        <TextField
          variant="outlined"
          label="title"
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="title of the blog"
        />
        <TextField
          variant="outlined"
          label="author"
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="blog's author"
        />
        <TextField
          variant="outlined"
          label="url"
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="e.g https://www.blogs.com/exampleBlog"
        />
        <Button variant="contained" type="submit">
          add blog
        </Button>
      </form>
    </div>
  );
  */
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
