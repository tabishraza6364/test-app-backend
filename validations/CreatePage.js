import { check } from 'express-validator'

const CreatePageValidation = [
  check('data').notEmpty().withMessage('Content is required')
]

export default CreatePageValidation
