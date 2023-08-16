import { ALL_AUTHORS } from "../queries";
import { gql, useMutation } from "@apollo/client";
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

const EditAuthorBirthYear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setBirthYear] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleBirthYearEdit = (e) => {
    e.preventDefault();

    setBirthYear({ variables: { name, setBornTo: Number(born) } });
  };
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleBirthYearEdit}>
        name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        born
        <input
          type="number"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
        />
        <br />
        <button type="submit" disabled={Boolean(!born || !name)}>
          update author
        </button>
      </form>
    </div>
  );
};

export default EditAuthorBirthYear;
