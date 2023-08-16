import { ALL_AUTHORS } from "../queries";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const SET_BIRTH_YEAR = gql`
  mutation setBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;

const EditAuthorBirthYearSelect = ({ authors }) => {
  const [born, setBorn] = useState("");

  const [setBirthYear] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleBirthYearEdit = (e) => {
    e.preventDefault();

    setBirthYear({
      variables: { name: e.target.name.value, setBornTo: Number(born) },
    });
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleBirthYearEdit}>
        <label>
          name
          <select name="name">
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        born
        <input
          type="number"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
        />
        <br />
        <button type="submit" disabled={Boolean(!born)}>
          update author
        </button>
      </form>
    </div>
  );
};

export default EditAuthorBirthYearSelect;
