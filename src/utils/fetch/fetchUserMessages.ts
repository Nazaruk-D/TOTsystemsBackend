import {supabase} from "../../supabase/supabase";

export async function fetchUserMessages(userId: number) {
    const { data: incomingMessage, error: incomingMessageError  } = await supabase
        .from('messages')
        .select('*')
        .eq('recipient_id', userId);

    const { data: sentMessage, error: sentMessageError } = await supabase
        .from('messages')
        .select('*')
        .eq('sender_id', userId);

    if (incomingMessageError || sentMessageError) {
        console.error(incomingMessageError, sentMessageError);
        return [];
    }

    return [...incomingMessage, ...sentMessage];
}
