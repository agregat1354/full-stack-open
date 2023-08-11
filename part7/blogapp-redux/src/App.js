import "./index.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Blogs from "./components/Blogs";
import User from "./components/User";
import Blog from "./components/Blog";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token) return;
    navigate("/login");
  }, [user]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/users" element={<Users />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/blogs/:id" element={<Blog />} />
    </Routes>
  );
};

export default App;
