import { Request, Response } from 'express'
import { decipherToken } from '../utils/functions'
import BlogsModel from '../models/blogs.models'

const test = (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Blogs-controller works!'
  })
}

const getBlogs = async (req: Request, res: Response) => {}

const createBlog = async (req: Request, res: Response) => {
  const { title, description } = req.body
  if (!title || !description || !req.headers.authorization) {
    return res.status(400).json({
      message: 'Bad request'
    })
  }
  const decipheredToken = decipherToken(req.headers.authorization)
  const author = decipheredToken.email
  try {
    const blog = new BlogsModel({
      title,
      description,
      author,
      createdAt: new Date().toISOString()
    })
    await blog.save()
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

const updateBlog = async (req: Request, res: Response) => {
  const { title, description } = req.body
  if (!title || !description || !req.headers.authorization) {
    return res.status(400).json({
      message: 'Bad request'
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

const deleteBlog = async (req: Request, res: Response) => {}

export { test, getBlogs, createBlog, updateBlog, deleteBlog }
