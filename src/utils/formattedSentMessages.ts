import {MessageType} from "../types/MessageType";

export async function formattedMessages(messages: any[]): Promise<MessageType[]> {
    const formattedMessages: MessageType[] = messages.map((message) => {
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
}
