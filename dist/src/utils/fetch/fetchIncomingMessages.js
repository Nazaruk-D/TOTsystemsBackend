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
exports.fetchIncomingMessages = void 0;
const supabase_1 = require("../../supabase/supabase");
const formattedSentMessages_1 = require("../formattedSentMessages");
function fetchIncomingMessages(userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: incomingMessages, error } = yield supabase_1.supabase
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
            .eq('recipient_email', userEmail);
        if (error) {
            console.error(error);
            return [];
        }
        const formattedIncomingMessages = (0, formattedSentMessages_1.formattedMessages)(incomingMessages);
        return formattedIncomingMessages;
    });
}
exports.fetchIncomingMessages = fetchIncomingMessages;
