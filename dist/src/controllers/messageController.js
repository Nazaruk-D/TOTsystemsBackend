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
const fetchIncomingMessages_1 = require("../utils/fetch/fetchIncomingMessages");
const fetchOutgoingMessages_1 = require("../utils/fetch/fetchOutgoingMessages");
class MessageController {
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userEmail } = req.params;
                const incomingMessages = yield (0, fetchIncomingMessages_1.fetchIncomingMessages)(userEmail);
                const outgoingMessages = yield (0, fetchOutgoingMessages_1.fetchOutgoingMessages)(userEmail);
                const messages = { incoming: incomingMessages, outgoing: outgoingMessages };
                return res.status(200).send({ message: 'ok', data: { messages } });
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
                const { data, error } = yield supabase_1.supabase
                    .from('messages')
                    .update({ folder })
                    .in('id', messagesId);
                if (error) {
                    console.error(error);
                    return res.status(500).send({ message: `Не удалось переместить сообщения в папку ${folder}` });
                }
                return res.status(200).send({ message: `Сообщения перемещены в папку ${folder}` });
            }
            catch (e) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { messagesId } = req.body;
                const { data, error: nullSenderError } = yield supabase_1.supabase
                    .from('messages')
                    .delete()
                    .in('id', messagesId);
                if (nullSenderError) {
                    throw nullSenderError;
                }
                return res.status(200).send({ message: 'Сообщение удалено' });
            }
            catch (e) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
    markMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { messagesId } = req.body;
                const { data, error: nullSenderError } = yield supabase_1.supabase
                    .from('messages')
                    .update({ is_read: true })
                    .in('id', messagesId);
                if (nullSenderError) {
                    throw nullSenderError;
                }
                return res.status(200).send({ message: 'Сообщение отмечено прочитанным' });
            }
            catch (e) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
}
module.exports = new MessageController();
