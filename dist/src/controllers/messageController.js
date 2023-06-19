"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = require("../supabase/supabase");
class MessageController {
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                console.log(userId);
                return res.status(200).send({ message: 'ok' });
            }
            catch (e) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
    sendMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sender, recipient, message, subject } = req.body;
                const { data, error } = yield supabase_1.supabase
                    .from('messages')
                    .insert([
                    {
                        message: message,
                        subject: subject,
                        sender_email: sender,
                        recipient_email: recipient,
                    }
                ]);
                if (error) {
                    console.error(error);
                    return res.status(500).send({ message: 'Ошибка при создании сообщения' });
                }
                return res.status(201).send({ message: 'Сообщение отправлено', data });
            }
            catch (e) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
    changeFolderMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { folder, messagesId } = req.body;
                console.log(folder, messagesId);
                const { data, error } = yield supabase_1.supabase
                    .from('messages')
                    .update({ folder })
                    .in('id', messagesId);
                if (error) {
                    console.error(error);
                    return res.status(500).send({ message: `Не удалось переместить сообщения в папку ${folder}` });
                }
                return res.status(200).send({ message: 'Сообщение отправлено' });
            }
            catch (e) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).send({ message: 'ok' });
            }
            catch (e) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
}
module.exports = new MessageController();
