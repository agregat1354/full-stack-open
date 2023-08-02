import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  const updateBlog = jest.fn();

  const blog = {
    title: "Test title",
    author: "Test author",
    url: "https://www.blogs.com/test",
    likes: 15,
    user: {
      username: "test",
      name: "Test Test",
      id: "a786cd786ca9876d876b976a",
    },
  };

  beforeEach(() => {
    container = render(<Blog blog={blog} updateBlog={updateBlog} />).container;
  });

  test("by default displays title and author (short form) but not url and number of likes (long form)", () => {
    const shortBlogFormContainer = container.querySelector(
      ".short-blog-form-container"
    );

    const longBlogFormContainer = container.querySelector(
      ".long-blog-form-container"
    );

    expect(shortBlogFormContainer.textContent).toContain(
      `${blog.title} ${blog.author}`
    );
    expect(shortBlogFormContainer.textContent).not.toContain(`${blog.url}`);
    expect(shortBlogFormContainer.textContent).not.toContain(`${blog.likes}`);
    expect(shortBlogFormContainer).toBeVisible();
    expect(longBlogFormContainer).not.toBeVisible();
  });

  test('after clicking "view" button long form is showed with proper content and short form is hidden', async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");

    const shortBlogFormContainer = container.querySelector(
      ".short-blog-form-container"
    );

    const longBlogFormContainer = container.querySelector(
      ".long-blog-form-container"
    );

    expect(shortBlogFormContainer).toBeVisible();
    expect(longBlogFormContainer).not.toBeVisible();

    await user.click(button);

    expect(shortBlogFormContainer).not.toBeVisible();
    expect(longBlogFormContainer).toBeVisible();

    expect(longBlogFormContainer.textContent).toContain(`${blog.title}`);
    expect(longBlogFormContainer.textContent).toContain(`${blog.author}`);
    expect(longBlogFormContainer.textContent).toContain(`${blog.url}`);
    expect(longBlogFormContainer.textContent).toContain(`${blog.likes}`);
  });

  test("after clicking like button twice, updateBlog function passed as prop is called twice", async () => {
    const user = userEvent.setup();
    const showLongFormButton = screen.getByText("view");
    const likeButton = screen.getByText("like");

    await user.click(showLongFormButton);
    await user.click(likeButton);
    await user.click(likeButton);

    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});
