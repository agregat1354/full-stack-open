import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Authors />} />
      <Route path="/books" element={<Books />} />
      <Route path="/add" element={<NewBook />} />
    </Routes>
  );
};

export default App;
