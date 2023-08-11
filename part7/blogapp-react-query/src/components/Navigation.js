import { Link } from "react-router-dom";
import { useUserValue } from "../UserContext";
import { useUserDispatch } from "../UserContext";
import { useShowNotification } from "../NotificationContext";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  const logout = () => {
    navigate("/login");
    window.localStorage.removeItem("loggedBlogappUser");
    userDispatch({ type: "LOG_OUT" });
    showNotification("logged out", "info", 5);
  };

  const showNotification = useShowNotification();

  const linkStyle = { padding: 5 };

  return (
    <div>
      <Link style={linkStyle} to="/">
        blogs
      </Link>
      <Link style={linkStyle} to="/users">
        users
      </Link>
      {user.username} is logged in
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Navigation;
