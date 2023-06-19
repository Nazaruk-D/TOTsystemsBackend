import {EndPoints} from "../enum/endPoints";
const Comment = require('express')
const messageController = require('../controllers/messageController')
const messageRouter = new Comment()


messageRouter.get("/", messageController.getMessages)
messageRouter.post("/", messageController.sendMessages)
messageRouter.put("/", messageController.changeFolderMessages)
messageRouter.delete("/", messageController.deleteMessage)

module.exports = messageRouter