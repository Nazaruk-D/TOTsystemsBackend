"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endPoints_1 = require("../enum/endPoints");
const RouterAuth = require('express');
const userController = require('../controllers/userController');
const userRouter = new RouterAuth();
userRouter.post(endPoints_1.EndPoints.Folder, userController.createFolder);
userRouter.delete(endPoints_1.EndPoints.Folder, userController.deleteFolder);
module.exports = userRouter;
