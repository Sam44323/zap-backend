import { Router } from 'express'
import authMiddleware from '../utils/auth.middleware'
import {
  test,
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog
} from '../controllers/blogs.controllers'

const blogsRouter = Router()
blogsRouter.get('/test', test)
blogsRouter.get('/getBlogs', authMiddleware, getBlogs)
blogsRouter.post('/blog', authMiddleware, createBlog)
blogsRouter.put('/blog/update/:id', authMiddleware, updateBlog)
blogsRouter.delete('/:id', authMiddleware, deleteBlog)

export default blogsRouter
