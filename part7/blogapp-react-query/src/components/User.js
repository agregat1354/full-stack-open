import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

const User = () => {
  const userId = useParams().id;
  console.log("this users id: ", userId);

  return (
    <div>
      <Navigation />
      <h2></h2>
    </div>
  );
};

export default User;
