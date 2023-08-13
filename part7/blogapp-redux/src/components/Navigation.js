import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../reducers/notificationReducer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    navigate("/login");
    dispatch(logoutUser());
    dispatch(showNotification("logged out", "info", 5));
  };
  const user = useSelector((state) => state.user);
  const linkStyle = {
    margin: 5,
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Button style={linkStyle} component={Link} to="/" variant="contained">
            blogs
          </Button>
          <Button
            style={linkStyle}
            component={Link}
            to="/users"
            variant="contained"
          >
            users
          </Button>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <span>{user.username} is logged in</span>
          <Button style={linkStyle} variant="outlined" onClick={logout}>
            logout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navigation;
