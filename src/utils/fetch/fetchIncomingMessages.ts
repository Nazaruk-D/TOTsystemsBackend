import {supabase} from "../../supabase/supabase";
import {formattedMessages} from "../formattedSentMessages";

export async function fetchIncomingMessages(userEmail: number) {
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

    const formattedIncomingMessages = formattedMessages(incomingMessages)
        return formattedIncomingMessages;
}
