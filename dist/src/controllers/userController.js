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
const supabase_1 = require("../supabase/supabase");
class UserController {
    createFolder(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nameFolder, userId } = req.body;
                const { data: userData, error } = yield supabase_1.supabase
                    .from('users')
                    .select('folders')
                    .eq('id', userId);
                if (error) {
                    return res.status(500).send({ message: 'Ошибка при создании новой папки' });
                }
                const userFolders = ((_a = userData[0]) === null || _a === void 0 ? void 0 : _a.folders) || [];
                if (userFolders.includes(nameFolder)) {
                    return res.status(400).send({ message: 'Папка уже существует' });
                }
                const updatedFolders = [...userFolders, nameFolder];
                const { error: updateError } = yield supabase_1.supabase
                    .from('users')
                    .update({ folders: updatedFolders })
                    .eq('id', userId);
                if (updateError) {
                    console.error("Error", updateError);
                    return res.status(500).send({ message: 'Ошибка при создании новой папки' });
                }
                return res.status(200).send({ code: 200, message: 'Папка успешно создана' });
            }
            catch (e) {
                console.error(e);
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
    deleteFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('user_password');
                return res.status(200).send({ code: 200, message: 'Папка успешно удалена' });
            }
            catch (e) {
                console.error(e);
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
}
module.exports = new UserController();
