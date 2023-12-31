"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endPoints_1 = require("../enum/endPoints");
const RouterAuth = require('express');
const authController = require('../controllers/authController');
const authRouter = new RouterAuth();
authRouter.get(endPoints_1.EndPoints.Me, authController.me);
authRouter.post(endPoints_1.EndPoints.Login, authController.login);
authRouter.post(endPoints_1.EndPoints.Registration, authController.registration);
authRouter.delete(endPoints_1.EndPoints.Logout, authController.logout);
module.exports = authRouter;
