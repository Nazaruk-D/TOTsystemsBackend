export type MessageType = {
    id: number;
    message: string;
    subject: string;
    sender: {
        id: number;
        name: string;
        email: string;
    };
    recipient: {
        id: number;
        name: string;
        email: string;
    };
    folder: string;
    is_read: boolean;
    is_selected?: boolean;
    created_at: string;
};
