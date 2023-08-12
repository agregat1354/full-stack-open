import "./index.css";
import { useEffect } from "react";
import { useUserValue } from "./UserContext.js";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import { useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  console.log("app gets rerendered");
  const navigate = useNavigate();
  const user = useUserValue();
  useEffect(() => {
    if (user) return;
    navigate("/login");
  }, [user]);

  const blogsQuery = useQuery("blogs", blogService.getAll);
  const usersQuery = useQuery("users", userService.getAll);

  const match = useMatch("/users/:id");
  const currentUser =
    match && usersQuery.data
      ? usersQuery.data.find((user) => user.id === match.params.id)
      : null;

  return (
    <>
      <Routes>
        <Route path="/" element={<Blogs blogsQuery={blogsQuery} />} />
        <Route path="/users" element={<Users usersQuery={usersQuery} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users/:id" element={<User user={currentUser} />} />
      </Routes>
    </>
  );
};

export default App;
