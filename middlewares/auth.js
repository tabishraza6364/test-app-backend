import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  if (!req?.headers?.authorization)
    return res.status(401).send({ error: 'Unauthorized' })
  jwt.verify(
    req?.headers?.authorization,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(401).send(err)
      } else {
        res.locals.userId = decoded.userId
        return next()
      }
    }
  )
}
