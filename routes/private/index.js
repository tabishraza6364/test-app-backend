import PageController from '../../controllers/PageController.js'
import AuthMiddleware from '../../middlewares/auth.js'
import CreatePageValidation from '../../validations/CreatePage.js'
import UpdatePageValidation from '../../validations/UpdatePage.js'

export default routes => {
  routes.use(AuthMiddleware)

  routes
    .get('/pages', PageController.index)
    .post('/pages/create', CreatePageValidation, PageController.create)
    .post('/pages/update', UpdatePageValidation, PageController.update)
}
