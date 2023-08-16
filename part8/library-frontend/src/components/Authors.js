import Navigation from "./Navigation";
import { useQuery, gql } from "@apollo/client";

const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const Authors = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error: {error.message}</div>;
  return (
    <div>
      <Navigation />
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
