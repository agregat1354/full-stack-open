import { useState } from "react";
import Notification from "./Notification";
import { useShowNotification } from "../NotificationContext";
import { useUserDispatch } from "../UserContext";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userDispatch = useUserDispatch();

  const showNotification = useShowNotification();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      userDispatch({ type: "LOG_IN", payload: user });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      navigate("/");
      showNotification("Succesfully logged in", "info", 5);
    } catch (err) {
      console.log(err);
      showNotification(err.response.data.error, "error", 5);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        username
        <input
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        password
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
