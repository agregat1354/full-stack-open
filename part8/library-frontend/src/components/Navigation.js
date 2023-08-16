import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Link to="/">
        <button>authors</button>
      </Link>
      <Link to="/books">
        <button>books</button>
      </Link>
      <Link to="/add">
        <button>add book</button>
      </Link>
    </div>
  );
};

export default Navigation;
