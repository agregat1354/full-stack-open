import { Link } from "react-router-dom";
import { useUserValue } from "../UserContext";
import { useUserDispatch } from "../UserContext";
import { useShowNotification } from "../NotificationContext";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const Navigation = () => {
  const user = useUserValue();
  const navigate = useNavigate();
  const userDispatch = useUserDispatch();

  const logout = () => {
    navigate("/login");
    window.localStorage.removeItem("loggedBlogappUser");
    userDispatch({ type: "LOG_OUT" });
    showNotification("logged out", "info", 5);
  };

  const showNotification = useShowNotification();

  return (
    <Navbar className="bg-dark" data-bs-theme="dark">
      <Container className="d-flex justify-content-between">
        <div className="d-flex">
          <Navbar.Brand>
            <Link to="/">Blogapp</Link>
          </Navbar.Brand>
          <Nav className="d-flex align-items-center">
            <Link className="d-block mx-2" to="/">
              <Button>Blogs</Button>
            </Link>
            <Link className="d-block mx-2" to="/users">
              <Button className="">Users</Button>
            </Link>
          </Nav>
        </div>
        <div className="d-flex">
          <Navbar.Text>
            Signed as: <Link to="#">{user.name}</Link>
          </Navbar.Text>
          <Button onClick={logout} className="d-block btn-secondary ms-3">
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
