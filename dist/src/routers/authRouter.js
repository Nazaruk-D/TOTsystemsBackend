"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endPoints_1 = require("../enum/endPoints");
const RouterAuth = require('express');
const authController = require('../controllers/authController');
const authRouter = new RouterAuth();
authRouter.post(endPoints_1.EndPoints.Registration, authController.registration);
module.exports = authRouter;
