import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const SingleBlogListItem = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`}>
      <ListItem disablePadding sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ListItemButton>
          <ListItemText primary={`${blog.title} ${blog.author}`} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SingleBlogListItem;
