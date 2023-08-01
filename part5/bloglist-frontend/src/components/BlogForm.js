/* eslint-disable quotes */
/* eslint-disable semi */
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
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        author
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        url
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit">add blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
