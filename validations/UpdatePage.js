import { check } from 'express-validator'

const UpdatePageValidation = [
  check('id').notEmpty().withMessage('Id is required'),
  check('data').notEmpty().withMessage('Content is required')
]

export default UpdatePageValidation
