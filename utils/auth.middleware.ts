import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided.' })
  }

  jwt.verify(authHeader, process.env.JWT_SECRET, (err: jwt.VerifyErrors, _) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Token invalid.' })
    }
    next()
  })
}

export default authMiddleware
