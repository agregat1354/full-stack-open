import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./Navigation";
import BlogList from "./BlogList";

const User = () => {
  const userId = useParams().id;
  const [user, setUser] = useState(null);
  const allBlogs = useSelector((state) => state.blogs);
  const [currentUsersBlogs, setCurrentUsersBlogs] = useState(null);

  useEffect(() => {
    setCurrentUsersBlogs(allBlogs.filter((blog) => blog.user.id === userId));
  }, [allBlogs]);

  useEffect(() => {
    if (!currentUsersBlogs || currentUsersBlogs.length === 0) return;
    setUser(currentUsersBlogs[0].user);
  }, [currentUsersBlogs]);

  if (!user || !currentUsersBlogs) return null;

  return (
    <div>
      <Navigation />
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <BlogList blogs={currentUsersBlogs} />
    </div>
  );
};

export default User;
