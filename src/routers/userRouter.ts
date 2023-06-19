import {EndPoints} from "../enum/endPoints";
const RouterAuth = require('express')
const userController = require('../controllers/userController')
const userRouter = new RouterAuth()


userRouter.get(`${EndPoints.Folder}/:userId`, userController.fetchUserFolders)
userRouter.post(EndPoints.Folder, userController.createFolder)
userRouter.delete(`${EndPoints.Folder}/:userId/:nameFolder`, userController.deleteFolder)



module.exports = userRouter