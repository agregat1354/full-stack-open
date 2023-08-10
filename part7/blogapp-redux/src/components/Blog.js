import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, updateBlog }) => {
  const [longFormVisible, setLongFormVisible] = useState(false);

  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleLongFormVisibility = () => {
    setLongFormVisible(!longFormVisible);
  };

  const handleLike = () => {
    const updatedBlogObj = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlog(updatedBlogObj);
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog));
  };

  const hideWhenLongFormVisible = { display: longFormVisible ? "none" : "" };
  const showWhenLongFormVisible = { display: longFormVisible ? "" : "none" };

  /*
  const showWhenOwnedByCurrentUser = {
    display: isOwnedByCurrentUser ? "" : "none",
  };
  */

  const showWhenOwnedByCurrentUser = {
    display: blog.user.username === username ? "" : "none",
  };

  return (
    <div style={blogStyle} className="blog">
      <div
        className="short-blog-form-container"
        style={hideWhenLongFormVisible}
      >
        {blog.title} {blog.author}
        <button onClick={toggleLongFormVisibility}>view</button>
      </div>
      <div className="long-blog-form-container" style={showWhenLongFormVisible}>
        {blog.title}
        <button onClick={toggleLongFormVisibility}>hide</button>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes}
        <button onClick={handleLike} className="likeBtn">
          like
        </button>
        <br />
        {blog.author}
        <span style={showWhenOwnedByCurrentUser}>
          <br />
          <button onClick={handleDelete}>remove</button>
        </span>
      </div>
    </div>
  );
};

export default Blog;
