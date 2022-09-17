import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
export const validateEmail = (email: string) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

export const decipherToken = (token: string): JwtPayload => {
  const decoded = jwt.decode(token)
  return decoded as JwtPayload
}
