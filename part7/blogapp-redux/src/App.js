import "./index.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Blogs from "./components/Blogs";

const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.token) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Blogs />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
    </Routes>
  );
};

export default App;
