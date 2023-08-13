/* eslint-disable indent */
import Navigation from "./Navigation";
import { useState } from "react";
import { useUserValue } from "../UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const Blog = ({ blog, updateBlog, deleteBlog, appendComment }) => {
  if (!blog) return null;
  const [comment, setComment] = useState("");
  const user = useUserValue();

  const handleLike = () => {
    const updatedBlogObj = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlog(updatedBlogObj);
  };

  const handleDelete = () => {
    deleteBlog(blog);
  };

  const showWhenOwnedByCurrentUser = {
    display: blog.user.username === user.username ? "" : "none",
  };

  const handleCommentAppend = (e) => {
    e.preventDefault();
    appendComment({ blogId: blog.id, comment });
    setComment("");
  };

  return (
    <div>
      <Navigation />
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span>{blog.likes} likes </span>
      <Button variant="secondary" onClick={handleLike}>
        like
      </Button>
      <br />
      <span>added by {user.name}</span>
      <br />
      <Button
        variant="danger"
        style={showWhenOwnedByCurrentUser}
        onClick={handleDelete}
      >
        remove
      </Button>
      <h2>comments</h2>
      <Form
        className="d-flex w-25 border border-3 border-light-subtle rounded p-2"
        onSubmit={handleCommentAppend}
      >
        <Form.Control
          style={{ height: 35, marginInlineEnd: 5 }}
          placeholder="write your comment here..."
          type="text"
          name="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button style={{ height: 35 }} variant="primary" type="submit">
          add comment
        </Button>
      </Form>
      <ListGroup>
        {blog.comments.length
          ? blog.comments.map((comment) => (
              <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
            ))
          : null}
      </ListGroup>
    </div>
  );
};

export default Blog;
