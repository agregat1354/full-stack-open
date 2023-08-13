import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Notification from "./Notification";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }, () => navigate("/")));
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <Notification />
      <form onSubmit={handleLogin}>
        <Stack style={{ width: 400, margin: "auto" }} spacing={2}>
          <h2>Log in to application</h2>
          <TextField
            label="username"
            variant="outlined"
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            label="password"
            variant="outlined"
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="contained" type="submit">
            login
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;
