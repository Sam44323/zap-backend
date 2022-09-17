import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/users.models'
import { validateEmail } from '../utils/functions'

const test = (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'User-controller works!'
  })
}

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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
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

const deleteUser = async (req: Request, res: Response) => {}

export { test, signup, login, deleteUser }
