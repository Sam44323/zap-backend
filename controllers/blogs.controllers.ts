import { Request, Response } from 'express'
import { decipherToken } from '../utils/functions'
import BlogsModel from '../models/blogs.models'
import UserModel from '../models/users.models'
import BlogCache from '../cache/blogs.cache'

/**
 *
 * @param _req Request
 * @param res Response
 * @description: This functions is used for testing the uptime of the blogs-route
 */
const test = (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Blogs-controller works!'
  })
}

const PAGE_LIMIT: number = parseInt(process.env.PAGE_LIMIT) || 5 // page-limit for pagination

/**
 *
 * @param req Request
 * @param res Response
 * @description: This functions is used for getting all/one of the blogs based on particular filters
 */

const getBlogs = async (req: Request, res: Response) => {
  const { email, pageNumber, sort } = req.body

  // payload checkers
  if (!email || !pageNumber) {
    return res.status(400).json({
      message: 'email is missing or page is missing'
    })
  }
  try {
    // checking if the given payloads matches already cached values
    if (
      BlogCache.get('email') === email.toLowerCase() &&
      BlogCache.get('pageNumber') === pageNumber &&
      BlogCache.get('sort') === sort.toLowerCase()
    ) {
      console.log('Getting from the cache...')
      return res.status(200).json({
        message: 'Blogs fetched successfully',
        blogs: BlogCache.get('blogs')
      })
    }
    const users = await UserModel.findOne({ email: email })
    if (!users) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    const blogs = await BlogsModel.find({ author: email })
      .limit(PAGE_LIMIT)
      .skip(PAGE_LIMIT * (pageNumber - 1))
      .sort({
        createdAt: sort === 'desc' ? -1 : 1 // will be ascending-ly sorted by default
      })
    BlogCache.set('email', email)
    BlogCache.set('pageNumber', pageNumber)
    BlogCache.set('sort', sort)
    BlogCache.set('blogs', blogs)
    return res.status(200).json({
      message: `All the blogs from ${email}`,
      blogs: blogs.length > 0 ? blogs : 'No more blogs...'
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

/**
 *
 * @param req Request
 * @param res Response
 * @description: This functions is used for creating a blog
 */

const createBlog = async (req: Request, res: Response) => {
  const { title, description } = req.body
  if (!title || !description || !req.headers.authorization) {
    return res.status(400).json({
      message: 'Bad request'
    })
  }
  const decipheredToken = decipherToken(req.headers.authorization) // deciphering the token to get the email

  const author = decipheredToken.email

  try {
    const blog = new BlogsModel({
      title,
      description,
      author,
      createdAt: new Date().toISOString()
    })
    await blog.save()

    BlogCache.flushAll() // flushing the cache

    return res.status(201).json({
      message: 'Blog created successfully'
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

/**
 *
 * @param req Request
 * @param res Response
 * @description: This function is used for updating the content of the blog
 */

const updateBlog = async (req: Request, res: Response) => {
  const { title, description } = req.body
  if (!title || !description) {
    return res.status(400).json({
      message: 'Incomplete data'
    })
  }
  const decipheredToken = decipherToken(req.headers.authorization)

  const author = decipheredToken.email
  try {
    const blog = await BlogsModel.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({
        message: 'Blog not found'
      })
    }
    if (blog.author !== author) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    blog.title = title
    blog.description = description
    await blog.save()
    BlogCache.flushAll()
    return res.status(200).json({
      message: 'Blog updated successfully'
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

/**
 *
 * @param req Request
 * @param res Response
 * @description: This functions is used for deleting a particular blog
 */

const deleteBlog = async (req: Request, res: Response) => {
  const decipheredToken = decipherToken(req.headers.authorization)
  const author = decipheredToken.email
  try {
    const blog = await BlogsModel.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({
        message: 'Blog not found'
      })
    }
    if (blog.author !== author) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    await blog.delete()
    BlogCache.flushAll()
    return res.status(200).json({
      message: 'Blog deleted successfully'
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export { test, getBlogs, createBlog, updateBlog, deleteBlog }
