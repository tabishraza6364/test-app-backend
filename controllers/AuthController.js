import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

class AuthController {
  async login (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const { email, password } = req.body
      const user = await User.findOne({ where: { email: email } })

      if (!user) {
        return res.status(401).json({ error: 'Incorrect email or password' })
      }

      const passwordMatch = await user.validPassword(password)

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect email or password' })
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
      res.json({
        user: { id: user.id, name: user.name, email: user.email },
        token
      })
    } catch (err) {
      res.status(500).json({ error: 'Server error', message: err.message })
    }
  }

  async register (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const { name, email, password } = req.body

      const existingUser = await User.findOne({ where: { email: email } })
      if (existingUser) {
        return res.status(422).json({
          errors: [
            {
              value: email,
              msg: 'Email is already in use',
              param: 'email',
              location: 'body'
            }
          ]
        })
      }

      const user = await User.create({ name, email, password })

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
      res.json({
        user: { id: user.id, name: user.name, email: user.email },
        token
      })
    } catch (err) {
      res.status(500).json({ error: 'Server error', message: err.message })
    }
  }
}

export default new AuthController()
