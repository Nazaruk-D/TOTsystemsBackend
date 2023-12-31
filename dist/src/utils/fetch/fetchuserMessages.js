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
function fetchIncomingMessages(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: messages, error } = yield supabase_1.supabase
            .from('messages')
            .select(`
      id,
      message,
      subject,
      sender:sender_id (id, name, email),
      recipient:recipient_id (id, name, email),
      folder,
      is_read,
      is_selected,
      created_at
      `)
            .or(`recipient_id.eq.${userId}`, `sender_id.eq.${userId}`);
        if (error) {
            console.error(error);
            return [];
        }
        return [...incomingMessage, ...sentMessage];
    });
}
exports.fetchIncomingMessages = fetchIncomingMessages;
