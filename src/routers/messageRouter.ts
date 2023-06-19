import {EndPoints} from "../enum/endPoints";
const Comment = require('express')
const messageController = require('../controllers/messageController')
const messageRouter = new Comment()


messageRouter.get("/:userEmail", messageController.getMessages)
messageRouter.post("/", messageController.sendMessages)
messageRouter.put("/", messageController.changeFolderMessages)
messageRouter.put(EndPoints.Incoming, messageController.deleteMessage)
messageRouter.put(EndPoints.Mark, messageController.markMessages)

module.exports = messageRouter