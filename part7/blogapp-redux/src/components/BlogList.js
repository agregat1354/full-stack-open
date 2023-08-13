import SingleBlogListItem from "./SingleBlogListItem";
import List from "@mui/material/List";

const BlogList = ({ blogs }) => {
  return (
    <List>
      {blogs.map((blog) => (
        <SingleBlogListItem key={blog.id} blog={blog} />
      ))}
    </List>
  );
};

export default BlogList;
