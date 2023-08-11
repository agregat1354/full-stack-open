import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserRow = ({ name, blogCount }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{blogCount}</td>
    </tr>
  );
};

const StatTable = ({ stats }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((userStatsArray) => (
          <UserRow
            key={userStatsArray[0]}
            name={userStatsArray[0]}
            blogCount={userStatsArray[1]}
          />
        ))}
      </tbody>
    </table>
  );
};

const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    console.log(blogs);
    const summaryObject = blogs.reduce((summary, currentBlog) => {
      if (Object.prototype.hasOwnProperty.call(summary, currentBlog.user.name))
        summary[currentBlog.user.name]++;
      else summary[currentBlog.user.name] = 1;
      return summary;
    }, {});
    const statsArray = Object.keys(summaryObject).map((key) => [
      key,
      summaryObject[key],
    ]);
    setStats(statsArray);
  }, [blogs]);

  return (
    <div>
      <Navigation />
      <h2>Users</h2>
      {stats && <StatTable stats={stats} />}
    </div>
  );
};

export default Users;
