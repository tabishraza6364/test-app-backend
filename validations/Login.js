import { check } from 'express-validator'

const LoginValidation = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid')
    .exists()
    .withMessage('Email is required'),
  check('password')
    .notEmpty()
    .withMessage('Password Field is required')
    .exists()
    .withMessage('Password Field is required')
]
export default LoginValidation
