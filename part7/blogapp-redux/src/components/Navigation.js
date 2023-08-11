import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../reducers/notificationReducer";

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
    padding: 5,
  };
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
