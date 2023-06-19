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
exports.formattedMessages = void 0;
function formattedMessages(messages) {
    return __awaiter(this, void 0, void 0, function* () {
        const formattedMessages = messages.map((message) => {
            const sender = Array.isArray(message.sender) ? message.sender[0] : message.sender;
            const recipient = Array.isArray(message.recipient) ? message.recipient[0] : message.recipient;
            return {
                id: message.id,
                message: message.message,
                subject: message.subject,
                sender: sender
                    ? {
                        id: sender.id,
                        name: sender.name,
                        email: sender.email,
                    }
                    : { id: 0, name: '', email: '' },
                recipient: recipient
                    ? {
                        id: recipient.id,
                        name: recipient.name,
                        email: recipient.email,
                    }
                    : { id: 0, name: '', email: '' },
                folder: message.folder,
                is_read: message.is_read,
                is_selected: message.is_selected,
                created_at: message.created_at,
            };
        });
        return Promise.resolve(formattedMessages);
    });
}
exports.formattedMessages = formattedMessages;
