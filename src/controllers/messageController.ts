import {Request, Response} from "express";
import {supabase} from "../supabase/supabase";
import {fetchIncomingMessages} from "../utils/fetch/fetchIncomingMessages";
import {fetchOutgoingMessages} from "../utils/fetch/fetchOutgoingMessages";

class MessageController {
    async getMessages(req: Request, res: Response) {
        try {
            const {userEmail} = req.params
            const incomingMessages = await fetchIncomingMessages(userEmail)
            const outgoingMessages = await fetchOutgoingMessages(userEmail)
            const messages = {incoming: incomingMessages, outgoing: outgoingMessages}
            return res.status(200).send({message: 'ok', data: {messages}});
        } catch (e) {
            return res.status(500).send({message: 'Internal server error'});
        }
    }

    async sendMessages(req: Request, res: Response) {
        try {
            const {sender, recipient, message, subject} = req.body;
            const {data, error} = await supabase
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
                return res.status(500).send({message: 'Ошибка при создании сообщения'});
            }

            return res.status(201).send({message: 'Сообщение отправлено', data});
        } catch (e) {
            return res.status(500).send({message: 'Internal server error'});
        }
    }

    async changeFolderMessages(req: Request, res: Response) {
        try {
            const {folder, messagesId} = req.body;
            const {data, error} = await supabase
                .from('messages')
                .update({folder})
                .in('id', messagesId)

            if (error) {
                console.error(error);
                return res.status(500).send({message: `Не удалось переместить сообщения в папку ${folder}`});
            }

            return res.status(200).send({message: `Сообщения перемещены в папку ${folder}`});
        } catch (e) {
            return res.status(500).send({message: 'Internal server error'});
        }
    }

    async deleteMessage(req: Request, res: Response) {
        try {
            const { messagesId } = req.body;
            const { data, error: nullSenderError } = await supabase
                .from('messages')
                .delete()
                .in('id', messagesId);

            if (nullSenderError) {
                throw nullSenderError;
            }

            return res.status(200).send({ message: 'Сообщение удалено' });
        } catch (e) {
            return res.status(500).send({message: 'Internal server error'});
        }
    }

}

module.exports = new MessageController()