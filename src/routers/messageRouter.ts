import {EndPoints} from "../enum/endPoints";
const Comment = require('express')
const messageController = require('../controllers/messageController')
const messageRouter = new Comment()


messageRouter.get(EndPoints.Get_Message, messageController.getMessages)

module.exports = messageRouter