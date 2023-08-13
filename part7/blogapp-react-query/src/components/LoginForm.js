import { useState } from "react";
import Notification from "./Notification";
import { useShowNotification } from "../NotificationContext";
import { useUserDispatch } from "../UserContext";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

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

  const spacedStyle = {
    marginTop: 15,
  };

  return (
    <Container className="w-25">
      <h2>Log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Label style={spacedStyle}>username</Form.Label>
        <Form.Control
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label style={spacedStyle} className="d-block mt-10">
          password
        </Form.Label>
        <Form.Control
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button style={spacedStyle} type="submit">
          login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
