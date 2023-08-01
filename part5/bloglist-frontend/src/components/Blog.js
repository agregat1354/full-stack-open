import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, isOwnedByCurrentUser }) => {
  const [longFormVisible, setLongFormVisible] = useState(false);

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
    deleteBlog(blog);
  };

  const hideWhenLongFormVisible = { display: longFormVisible ? "none" : "" };
  const showWhenLongFormVisible = { display: longFormVisible ? "" : "none" };

  const showWhenOwnedByCurrentUser = {
    display: isOwnedByCurrentUser ? "" : "none",
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenLongFormVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleLongFormVisibility}>view</button>
      </div>
      <div style={showWhenLongFormVisible}>
        {blog.title}
        <button onClick={toggleLongFormVisibility}>hide</button>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
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
