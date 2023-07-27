const Blog = require('../models/blog.js')


const initialBlogs = [
    {
        title: "Learn react",
        author: "Dan Abramov",
        url: 'https://rect.dev',
        likes: 15
    },
    {
        title: "Innovative fighting techniques",
        author: "Steven Segal",
        url: 'https://www.steven-segal.blog/fighting',
        likes: 1354
    }
]


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    blogsJson = blogs.map(blog => blog.toJSON())
    return blogsJson
}

const nonExistentId = async () => {
    const nonExistentBlogObject = {
        title: "title",
        author: "author",
        url: "https://localhost/thisblogdoesnotexist",
        likes: 0
    }

    const nonExistentBlog = new Blog(nonExistentBlogObject)
    await nonExistentBlog.save()
    const id = nonExistentBlog._id.toString()
    await Blog.findByIdAndRemove(id)
    return id
}

module.exports = {
    blogsInDb,
    initialBlogs,
    nonExistentId
}