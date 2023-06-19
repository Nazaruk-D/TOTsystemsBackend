import {EndPoints} from "../enum/endPoints";
const RouterAuth = require('express')
const userController = require('../controllers/userController')
const userRouter = new RouterAuth()


userRouter.post(EndPoints.Folder, userController.createFolder)
userRouter.delete(EndPoints.Folder, userController.deleteFolder)



module.exports = userRouter