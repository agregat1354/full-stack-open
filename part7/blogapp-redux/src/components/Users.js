import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../services/users";

const UserRow = ({ user }) => {
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
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  if (!users) return null;

  return (
    <div>
      <Navigation />
      <h2>Users</h2>
      <StatTable users={users} />
    </div>
  );
};

export default Users;
