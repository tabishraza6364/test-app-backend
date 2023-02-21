import LoginValidation from '../../validations/Login.js'
import RegisterValidation from '../../validations/Register.js'
import AuthController from '../../controllers/AuthController.js'

export default routes => {
  routes
    .post('/login', LoginValidation, AuthController.login)
    .post('/register', RegisterValidation, AuthController.register)
}
