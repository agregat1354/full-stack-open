import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../services/users";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const UserRow = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  );
};

const StatTable = ({ users }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
