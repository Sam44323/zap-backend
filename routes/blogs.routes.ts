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
blogsRouter.get('/getBlogs', getBlogs)
blogsRouter.post('/blog', createBlog)
blogsRouter.put('/blog/update/:id', updateBlog)
blogsRouter.delete('/:id', deleteBlog)

export default blogsRouter
