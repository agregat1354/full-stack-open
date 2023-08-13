import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlog,
  updateBlog,
  appendCommentToBlog,
} from "../reducers/blogReducer";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

const Blog = () => {
  const blogId = useParams().id;
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  );

  if (!blog) return null;
  const handleLike = () => {
    const updatedBlogObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    dispatch(updateBlog(updatedBlogObject));
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog));
  };

  const showWhenOwnedByCurrentUser = {
    display: blog.user.username === username ? "" : "none",
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(appendCommentToBlog(blog.id, comment));
    setComment("");
  };

  return (
    <div>
      <Navigation />
      <Stack spacing={2} style={{ width: 300 }}>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div>
          <span>{blog.likes} likes</span>
          <Button
            style={{ marginLeft: 10 }}
            variant="contained"
            onClick={handleLike}
          >
            like
          </Button>
        </div>
        <span>added by {blog.user.name}</span>
      </Stack>
      <Button
        variant="contained"
        style={{
          ...showWhenOwnedByCurrentUser,
          backgroundColor: "red",
          marginTop: 10,
        }}
        onClick={handleDelete}
      >
        remove
      </Button>
      <h2>comments:</h2>
      <form onSubmit={handleCommentSubmit}>
        <Grid container alignItems="center" direction="row">
          <TextField
            variant="outlined"
            placeholder="write your comment here"
            type="text"
            name="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button sx={{ marginLeft: "10px" }} variant="contained" type="submit">
            add comment
          </Button>
        </Grid>
      </form>
      <List>
        {blog.comments.length ? (
          blog.comments.map((comment) => (
            <ListItem key={comment}>
              <ListItemText primary={comment} />
            </ListItem>
          ))
        ) : (
          <p>no comments yet...</p>
        )}
      </List>
    </div>
  );
};

export default Blog;
