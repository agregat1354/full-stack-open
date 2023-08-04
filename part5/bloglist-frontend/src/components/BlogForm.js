/* eslint-disable quotes */
/* eslint-disable semi */
import PropTypes from "prop-types";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogFormSubmission = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogFormSubmission}>
        title
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="title of the blog"
        />
        <br />
        author
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="blog's author"
        />
        <br />
        url
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="e.g https://www.blogs.com/exampleBlog"
        />
        <br />
        <button type="submit">add blog</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
