import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/users.models'
import BlogsModel from '../models/blogs.models'
import { decipherToken, validateEmail } from '../utils/functions'

/**
 *
 * @param _req Request
 * @param res Response
 * @description: This functions is used for testing the uptime of the users-route
 */

const test = (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'User-controller works!'
  })
}

/**
 *
 * @param req Request
 * @param res Response
 * @description: This functions is used for signing up a new user
 */

const signup = async (req: Request, res: Response) => {
  const { name, email } = req.body
  if (!name || !email || !validateEmail(email)) {
    return res.status(400).json({
      message: 'Either name or email is missing or email is invalid!'
    })
  }
  try {
    const user = await UserModel.findOne({ email })
    if (user) {
      return res.status(400).json({
        message: 'User already exists!'
      })
    }
    const newUser = new UserModel({
      name,
      email
    })
    await newUser.save()
    return res.status(201).json({
      message: 'User created successfully!'
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Something went wrong!'
    })
  }
}

/**
 *
 * @param req Request
 * @param res Response
 * @description: This functions is used for logging in an user
 */

const login = async (req: Request, res: Response) => {
  const { email } = req.body
  if (!email || !validateEmail(email)) {
    return res.status(400).json({
      message: 'Email is missing or email is invalid!'
    })
  }
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist!'
      })
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )
    return res.status(200).json({
      message: 'User logged in successfully!',
      token
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Something went wrong!'
    })
  }
}

/**
 *
 * @param req Request
 * @param res Response
 * @description: This functions is used for deleting an user
 */

const deleteUser = async (req: Request, res: Response) => {
  const decipheredToken: JwtPayload = decipherToken(req.headers.authorization)
  try {
    const user = await UserModel.findOne({ email: decipheredToken.email })
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist!'
      })
    }
    await BlogsModel.deleteMany({ author: user.email })
    await UserModel.findByIdAndDelete(user._id)
    return res.status(200).json({
      message: 'User deleted successfully!'
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Something went wrong!'
    })
  }
}

export { test, signup, login, deleteUser }
