import { Router } from 'express'
import PublicRoutes from './public/index.js'
import PrivateRoutes from './private/index.js'
import { ValidationError } from 'express-validation'

export default app => {
  const routes = Router()

  PublicRoutes(routes)
  PrivateRoutes(routes)

  app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(422).json({ err })
    }

    return res.status(500).json(err)
  })

  app.use('/api/', [routes])
}
