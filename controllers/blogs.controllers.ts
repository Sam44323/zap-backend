import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import BlogsModel from '../models/blogs.models'

const test = (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Blogs-controller works!'
  })
}

const getBlogs = async (req: Request, res: Response) => {}

const createBlog = async (req: Request, res: Response) => {}

const updateBlog = async (req: Request, res: Response) => {}

const deleteBlog = async (req: Request, res: Response) => {}

export { test, getBlogs, createBlog, updateBlog, deleteBlog }
