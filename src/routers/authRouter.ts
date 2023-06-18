import {EndPoints} from "../enum/endPoints";
const RouterAuth = require('express')
const authController = require('../controllers/authController')
const authRouter = new RouterAuth()


authRouter.get(EndPoints.Me, authController.me)
authRouter.post(EndPoints.Login, authController.login)
authRouter.post(EndPoints.Registration, authController.registration)
authRouter.delete(EndPoints.Logout, authController.logout)


module.exports = authRouter