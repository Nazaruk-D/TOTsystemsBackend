import {Request, Response} from "express";
import {supabase} from "../supabase/supabase";

class MessageController {
    async getMessages(req: Request, res: Response) {
        try {
            const {userId} = req.body
            console.log(userId)
            return res.status(200).send({message: 'ok'});
        } catch (e) {
            return res.status(500).send({message: 'Internal server error'});
        }
    }

    async sendMessages(req: Request, res: Response) {
        try {
            const { sender, recipient, message, subject } = req.body;
            const { data, error } = await supabase
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
        } catch (e) {
            return res.status(500).send({message: 'Internal server error'});
        }
    }

    async changeFolderMessages(req: Request, res: Response) {
        try {
            const { folder, messagesId } = req.body;
            console.log(folder, messagesId)
            const { data, error } = await supabase
                .from('messages')
                .update({folder})
                .in('id', messagesId)

            if (error) {
                console.error(error);
                return res.status(500).send({ message: `Не удалось переместить сообщения в папку ${folder}` });
            }

            return res.status(200).send({ message: 'Сообщение отправлено' });
        } catch (e) {
            return res.status(500).send({message: 'Internal server error'});
        }
    }

    async deleteMessage(req: Request, res: Response) {
        try {
            return res.status(200).send({message: 'ok'});
        } catch (e) {
            return res.status(500).send({message: 'Internal server error'});
        }
    }
}

module.exports = new MessageController()