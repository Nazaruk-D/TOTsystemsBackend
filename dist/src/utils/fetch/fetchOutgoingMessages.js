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
exports.fetchOutgoingMessages = void 0;
const supabase_1 = require("../../supabase/supabase");
const formattedSentMessages_1 = require("../formattedSentMessages");
function fetchOutgoingMessages(userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: sentMessages, error } = yield supabase_1.supabase
            .from('messages')
            .select(`
      id,
      message,
      subject,
      sender:sender_email (id, name, email),
      recipient:recipient_email (id, name, email),
      folder,
      is_read,
      is_selected,
      created_at
      `)
            .eq('sender_email', userEmail);
        if (error) {
            console.error(error);
            return [];
        }
        const formattedOutgoingMessages = yield (0, formattedSentMessages_1.formattedMessages)(sentMessages);
        formattedOutgoingMessages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        return formattedOutgoingMessages;
    });
}
exports.fetchOutgoingMessages = fetchOutgoingMessages;
