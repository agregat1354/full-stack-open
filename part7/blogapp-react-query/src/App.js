import "./index.css";
import { useEffect } from "react";
import { useUserValue } from "./UserContext.js";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import { useParams, useMatch } from "react-router-dom";

const App = () => {
  const params = useParams();
  const result = useMatch("/users/:id");
  console.log("result: ", result);
  console.log("params in app: ", params);
  const navigate = useNavigate();
  const user = useUserValue();
  useEffect(() => {
    if (user) return;
    navigate("/login");
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </>
  );
};

export default App;
