/* eslint-disable quotes */
/* eslint-disable semi */
import PropTypes from "prop-types";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

  const labelStyle = {
    display: "block",
    marginTop: 18,
  };

  return (
    <div className="w-25 border border-3 border-success rounded p-3">
      <h2>create new</h2>
      <Form onSubmit={handleBlogFormSubmission}>
        <Form.Label style={labelStyle}>title</Form.Label>
        <Form.Control
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="title of the blog"
        />
        <Form.Label style={labelStyle}>author</Form.Label>
        <Form.Control
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="blog's author"
        />
        <Form.Label style={labelStyle}>url</Form.Label>
        <Form.Control
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="e.g https://www.blogs.com/exampleBlog"
        />
        <Button style={{ marginTop: 10 }} variant="primary" type="submit">
          add blog
        </Button>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
