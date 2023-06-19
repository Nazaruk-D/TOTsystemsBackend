import e, {Request, Response} from "express";
import {supabase} from "../supabase/supabase";
import {fetchUsersName} from "../utils/fetch/fetchUsersName";
import {fetchIncomingMessages} from "../utils/fetch/fetchIncomingMessages";
import {fetchOutgoingMessages} from "../utils/fetch/fetchOutgoingMessages";

class UserController {
    async createFolder(req: Request, res: Response) {
        try {
            const { nameFolder, userId } = req.body;
            const { data: userData, error } = await supabase
                .from('users')
                .select('folders')
                .eq('id', userId);

            if (error) {
                return res.status(500).send({ message: 'Ошибка при создании новой папки' });
            }

            const userFolders = userData[0]?.folders || [];

            if (userFolders.includes(nameFolder)) {
                return res.status(400).send({ message: 'Папка уже существует' });
            }

            const updatedFolders = [...userFolders, nameFolder];

            const { error: updateError } = await supabase
                .from('users')
                .update({ folders: updatedFolders })
                .eq('id', userId);

            if (updateError) {
                console.error("Error", updateError);
                return res.status(500).send({ message: 'Ошибка при создании новой папки' });
            }

            return res.status(200).send({ code: 200, message: 'Папка успешно создана' });
        } catch (e) {
            console.error(e);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }

    async deleteFolder (req: Request, res: Response) {
        try {
            res.clearCookie('user_password');
            return res.status(200).send({code: 200, message: 'Папка успешно удалена'});
        } catch (e) {
            console.error(e);
            return res.status(500).send({message: 'Internal server error'});
        }
    }
}

module.exports = new UserController();
