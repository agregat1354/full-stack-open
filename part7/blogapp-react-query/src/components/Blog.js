import Navigation from "./Navigation";
import { useState } from "react";
import { useUserValue } from "../UserContext";

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
      <button onClick={handleLike}>like</button>
      <br />
      <span>added by {user.name}</span>
      <br />
      <button style={showWhenOwnedByCurrentUser} onClick={handleDelete}>
        remove
      </button>
      <h2>comments</h2>
      <form onSubmit={handleCommentAppend}>
        <input
          placeholder="write your comment here..."
          type="text"
          name="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.length
          ? blog.comments.map((comment) => <li key={comment}>{comment}</li>)
          : null}
      </ul>
    </div>
  );
};

export default Blog;
