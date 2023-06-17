import {EndPoints} from "../enum/endPoints";
const RouterAuth = require('express')
const authController = require('../controllers/authController')
const authRouter = new RouterAuth()


authRouter.post(EndPoints.Registration, authController.registration)

module.exports = authRouter