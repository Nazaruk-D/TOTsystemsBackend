import {supabase} from "../../supabase/supabase";
import {formattedMessages} from "../formattedSentMessages";

export async function fetchIncomingMessages(userEmail: string) {
    const {data: incomingMessages, error} = await supabase
        .from('messages')
        .select(
            `
      id,
      message,
      subject,
      sender:sender_email (id, name, email),
      recipient:recipient_email (id, name, email),
      folder,
      is_read,
      is_selected,
      created_at
      `
        )
        .eq('recipient_email', userEmail);

    if (error) {
        console.error(error);
        return [];
    }

    const formattedIncomingMessages = await formattedMessages(incomingMessages)

    formattedIncomingMessages.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return formattedIncomingMessages;
}
