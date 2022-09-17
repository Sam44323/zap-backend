import { Router } from 'express'
import {
  deleteUser,
  login,
  signup,
  test
} from '../controllers/users.controllers'

const userRouter = Router()
userRouter.get('/test', test)
userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.delete('/delete', deleteUser)

export default userRouter
