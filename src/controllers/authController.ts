import e, {Request, Response} from "express";
import {supabase} from "../supabase/supabase";
import {fetchUsersName} from "../utils/fetch/fetchUsersName";
import {fetchIncomingMessages} from "../utils/fetch/fetchIncomingMessages";
import {fetchOutgoingMessages} from "../utils/fetch/fetchOutgoingMessages";

const bcrypt = require('bcrypt');


class AuthController {
    async registration(req: Request, res: Response) {
        try {
            const {name, email, password} = req.body;
            const {data: existingUser, error: existingUserError} = await supabase
                .from('users')
                .select('email')
                .eq('email', email)
                .single();

            if (existingUser) {
                return res.status(409).send({code: 409, message: 'Аккаунт уже зарегистрирован'});
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const {data, error} = await supabase
                .from('users')
                .insert([{name, email, hashed_password: hashedPassword}])
                .single();

            if (error) {
                throw error;
            }

            return res.status(201).send({code: 201, message: 'Аккаунт зарегистрирован', data: {name, email}});
        } catch (e) {
            console.error(e);
            return res.status(500).send({message: 'Internal server error'});
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const {data: userData, error} = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            if (error || !userData.id) {
                return res.status(401).send({code: 401, message: 'Неправильный email или пароль'});
            }

            const isPasswordValid = await bcrypt.compare(password, userData.hashed_password);

            if (!isPasswordValid) {
                return res.status(401).send({code: 401, message: 'Неправильный email или пароль'});
            }

            res.cookie('user_password', userData.hashed_password, {httpOnly: true});
            const {name, id, avatar, folders} = userData
            const users = await fetchUsersName()

            return res.status(200).send({
                message: 'Успешная аутентификация',
                data: {userData: {name, id, avatar, folders}, users}
            });

        } catch (e) {
            console.error(e);
            return res.status(500).send({message: 'Internal server error'});
        }
    }

    async me(req: Request, res: Response) {
        try {
            const password = req.cookies.user_password;
            if (!password) {
                return res.status(401).json({message: 'Не авторизован в токене', statusCode: 401});
            }

            const {data: userData, error} = await supabase
                .from('users')
                .select('name, email, id, avatar, folders')
                .eq('hashed_password', password)
                .single();

            if (error) {
                throw error;
            }

            if (!userData) {
                return res.status(404).json({message: 'Пользователь не найден', statusCode: 404});
            }

            const users = await fetchUsersName()
            return res.status(200).json({
                message: 'Успешно',
                data: {userData, users}
            });
        } catch (e) {
            console.error(e);
            res.status(400).json({message: 'Me error', statusCode: 400});
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie('user_password');
            return res.status(200).send({code: 200, message: 'Успешный выход из системы'});
        } catch (e) {
            console.error(e);
            return res.status(500).send({message: 'Internal server error'});
        }
    }

}

module.exports = new AuthController();
