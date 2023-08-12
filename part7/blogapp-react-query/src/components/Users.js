import Navigation from "./Navigation";
import { useQuery } from "react-query";
import userService from "../services/users.js";
import { Link } from "react-router-dom";

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
    <table>
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
    </table>
  );
};

const Users = () => {
  const {
    isLoading,
    isError,
    data: users,
    error,
  } = useQuery("users", userService.getAll);

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
