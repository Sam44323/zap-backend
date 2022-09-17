import { Router } from 'express'
import { test } from '../controllers/blogs.controllers'

const blogsRouter = Router()
blogsRouter.get('/test', test)

export default blogsRouter
