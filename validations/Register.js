import { check } from 'express-validator'

const RegisterValidation = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid')
    .exists()
    .withMessage('Email is already in use'),
  check('name').notEmpty().withMessage('Name is required'),

  check('password')
    .notEmpty()
    .withMessage('Password Field is required')
    .exists()
    .withMessage('Password Field is required')
    .isLength({ min: 8 })
    .withMessage('Password Length must be 8'),
  check('password_confirmation')
    .custom((value, { req }) => {
      if (req.body.password !== req.body.password_confirmation) {
        return false
      }
      return true
    })
    .withMessage("Passwords don't match.")
]
export default RegisterValidation
