import { Request, Response } from 'express'

const test = (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'User-controller works!'
  })
}

export { test }
