"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endPoints_1 = require("../enum/endPoints");
const Comment = require('express');
const messageController = require('../controllers/messageController');
const messageRouter = new Comment();
messageRouter.get(endPoints_1.EndPoints.Get_Message, messageController.getMessages);
module.exports = messageRouter;
