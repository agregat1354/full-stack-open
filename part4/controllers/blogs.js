const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;

  const blog = new Blog({ title, author, url, likes });

  blog.user = user.id;

  user.blogs = user.blogs.concat(blog.id);
  await user.save();

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const user = request.user;

  const blogToDelete = await Blog.findById(id);
  if (!blogToDelete) {
    return response
      .status(400)
      .json({ error: `blog with id:${id} does not exist` });
  }

  if (user._id.toString() !== blogToDelete.user.toString()) {
    return response
      .status(401)
      .json({ error: "you are not allowed to delete this blog" });
  }

  const deletedBlog = await Blog.findByIdAndDelete(blogToDelete._id.toString());

  user.blogs = user.blogs.filter((blog) => blog._id.toString() !== id);
  await user.save();

  if (deletedBlog) {
    response.status(204).end();
  } else {
    response.status(400).json({ error: "blog with given id does not exist" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes, user } = request.body;

  const updatedObject = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user },
    { runValidators: true, new: true, context: "query" }
  );

  if (updatedObject) {
    response.status(200).json(updatedObject);
  } else {
    response.status(400).end();
  }
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;
  if (!comment) return response.status(400).end();
  const blogId = request.params.id;

  const blogToUpdate = await Blog.findById(blogId);
  blogToUpdate.comments.push(comment);
  const savedBlog = await blogToUpdate.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
