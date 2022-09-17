import { Router } from 'express'
import {
  test,
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog
} from '../controllers/blogs.controllers'

const blogsRouter = Router()
blogsRouter.get('/test', test)
blogsRouter.get('/', getBlogs)
blogsRouter.post('/', createBlog)
blogsRouter.put('/:id', updateBlog)
blogsRouter.delete('/:id', deleteBlog)

export default blogsRouter
