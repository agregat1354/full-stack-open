import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

const UserStatRow = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const StatTable = ({ users }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserStatRow key={user.username} user={user} />
        ))}
      </tbody>
    </Table>
  );
};

const Users = ({ usersQuery: { isLoading, isError, data: users, error } }) => {
  if (isLoading) return <div>...loading</div>;
  if (isError) return <div>error: {error.message}</div>;

  return (
    <div>
      <Navigation />
      <h2>Users</h2>
      <StatTable users={users} />
    </div>
  );
};

export default Users;
