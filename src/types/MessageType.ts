export type MessageType = {
    id: string;
    message: string;
    subject: string;
    user: {
        id: string;
        name: string;
    };
    folder: string;
    isRead: boolean;
    created_at: string;
    isSelected?: boolean;
};
