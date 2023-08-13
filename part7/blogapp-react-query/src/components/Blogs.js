import { useRef, useState, useEffect } from "react";
import Togglable from "./Togglable.js";
import BlogForm from "./BlogForm";
import Notification from "./Notification.js";
import Navigation from "./Navigation.js";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const Blogs = ({
  blogsQuery: { isLoading, isError, data: blogs, error },
  handleBlogCreate,
}) => {
  const [sortedBlogs, setSortedBlogs] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    if (!blogs) return;
    setSortedBlogs(blogs.toSorted((b1, b2) => b2.likes - b1.likes));
  }, [blogs]);

  const handleCreateNewBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    handleBlogCreate(newBlog);
  };

  if (isLoading) return <div>...loading</div>;
  if (isError) return <div>error: {error.message}</div>;
  if (!sortedBlogs) return <div>preparing data</div>;
  return (
    <div>
      <Navigation />
      <h2>blogs</h2>
      <Notification />
      <h2>list of blogs</h2>
      <ListGroup>
        {sortedBlogs.map((blog) => (
          <Link
            to={`/blogs/${blog.id}`}
            style={{ margin: 5 }}
            className="border border-2 rounded border-light-subtle"
            key={blog.id}
          >
            <ListGroup.Item>
              {blog.title} {blog.author}
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateNewBlog} />
      </Togglable>
    </div>
  );
};

export default Blogs;
