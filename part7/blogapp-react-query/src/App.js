import "./index.css";
import { useEffect } from "react";
import { useUserValue } from "./UserContext.js";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Users from "./components/Users";

const App = () => {
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
      </Routes>
    </>
  );
};

export default App;
