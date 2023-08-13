import Navigation from "./Navigation";
import ListGroup from "react-bootstrap/ListGroup";

const User = ({ user }) => {
  if (!user) return null;
  return (
    <div>
      <Navigation />
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
