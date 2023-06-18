"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comment = require('express');
const messageController = require('../controllers/messageController');
const messageRouter = new Comment();
messageRouter.get("/", messageController.getMessages);
messageRouter.post("/", messageController.sendMessages);
messageRouter.delete("/", messageController.deleteMessage);
module.exports = messageRouter;
