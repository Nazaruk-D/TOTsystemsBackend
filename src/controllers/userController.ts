import {Request, Response} from "express";
import {supabase} from "../supabase/supabase";

class UserController {
    async fetchUserFolders(req: Request, res: Response) {
        try {
            const {userId} = req.params;
            if (!userId) {
                return res.status(200).send({code: 200, message: 'Некорректный id пользователя', data: []});
            }
            const {data: userFolders, error} = await supabase
                .from('users')
                .select('folders')
                .eq('id', userId)
                .single()

            if (error) {
                return res.status(500).send({message: 'Ошибка при создании новой папки'});
            }

            if (userFolders) {
                return res.status(200).send({
                    code: 200,
                    message: 'Папки пользователя получены',
                    data: {folders: userFolders.folders}
                });
            }

        } catch (e) {
            console.error(e);
            return res.status(500).send({message: 'Internal server error'});
        }
    }

    async createFolder(req: Request, res: Response) {
        try {
            const {nameFolder, userId} = req.body;
            const {data: userData, error} = await supabase
                .from('users')
                .select('folders')
                .eq('id', userId);

            if (error) {
                return res.status(500).send({message: 'Ошибка при создании новой папки'});
            }

            const userFolders = userData[0]?.folders || [];

            if (userFolders.includes(nameFolder)) {
                return res.status(400).send({message: 'Папка уже существует'});
            }

            const updatedFolders = [...userFolders, nameFolder];

            const {error: updateError} = await supabase
                .from('users')
                .update({folders: updatedFolders})
                .eq('id', userId);

            if (updateError) {
                console.error("Error", updateError);
                return res.status(500).send({message: 'Ошибка при создании новой папки'});
            }

            return res.status(200).send({code: 200, message: 'Папка успешно создана'});
        } catch (e) {
            console.error(e);
            return res.status(500).send({message: 'Internal server error'});
        }
    }

    async deleteFolder(req: Request, res: Response) {
        try {
            const { userId, nameFolder } = req.params;

            const { data: userData, error } = await supabase
                .from('users')
                .select('folders')
                .eq('id', userId)
                .single();

            if (error) {
                return res.status(500).send({ message: 'Ошибка при удалении папки' });
            }

            const folders = userData.folders || [];
            const folderIndex = folders.indexOf(nameFolder);
            if (folderIndex === -1) {
                return res.status(404).send({ message: 'Папка не найдена' });
            }

            folders.splice(folderIndex, 1);

            const { error: updateError } = await supabase
                .from('users')
                .update({ folders })
                .eq('id', userId);

            if (updateError) {
                return res.status(500).send({ message: 'Ошибка при обновлении папки' });
            }

            return res.status(200).send({ code: 200, message: 'Папка успешно удалена' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Внутренняя ошибка сервера' });
        }
    }

}

module.exports = new UserController();
