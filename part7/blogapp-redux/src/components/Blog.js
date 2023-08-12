import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlog,
  updateBlog,
  appendCommentToBlog,
} from "../reducers/blogReducer";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

const Blog = () => {
  const blogId = useParams().id;
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  );

  if (!blog) return null;
  const handleLike = () => {
    const updatedBlogObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    dispatch(updateBlog(updatedBlogObject));
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog));
  };

  const showWhenOwnedByCurrentUser = {
    display: blog.user.username === username ? "" : "none",
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(appendCommentToBlog(blog.id, comment));
    setComment("");
  };

  return (
    <div>
      <Navigation />
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span>{blog.likes} likes</span>
      <button onClick={handleLike}>like</button>
      <br />
      <span>added by {blog.user.name}</span>
      <br />
      <button style={showWhenOwnedByCurrentUser} onClick={handleDelete}>
        remove
      </button>
      <h2>comments:</h2>
      <form onSubmit={handleCommentSubmit}>
        <input
          placeholder="write your comment here"
          type="text"
          name="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.length ? (
          blog.comments.map((comment) => <li key={comment}>{comment}</li>)
        ) : (
          <p>no comments yet...</p>
        )}
      </ul>
    </div>
  );
};

export default Blog;
