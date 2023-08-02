import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  let container;
  const createBlog = jest.fn();

  beforeEach(() => {
    container = render(<BlogForm createBlog={createBlog} />).container;
  });

  test("when creating new blog, createBlog() event handler passed as prop is called with right details", async () => {
    const user = userEvent.setup();
    const addBlogButton = screen.getByText("add blog");

    const titleInput = screen.getByPlaceholderText("title of the blog");
    const authorInput = screen.getByPlaceholderText("blog's author");
    const urlInput = screen.getByPlaceholderText(
      "e.g https://www.blogs.com/exampleBlog"
    );

    const exampleInputObj = {
      title: "Test title",
      author: "John Test",
      url: "https://www.blog.com/exampleBlog",
    };

    await userEvent.type(titleInput, exampleInputObj.title);
    await userEvent.type(authorInput, exampleInputObj.author);
    await userEvent.type(urlInput, exampleInputObj.url);

    await user.click(addBlogButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual(exampleInputObj);
  });
});
