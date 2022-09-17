import { Request, Response } from 'express'
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
}

export { test }
