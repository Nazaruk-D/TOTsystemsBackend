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
const fetchUsersName_1 = require("../utils/fetch/fetchUsersName");
const fetchUserMessages_1 = require("../utils/fetch/fetchUserMessages");
const bcrypt = require('bcrypt');
class AuthController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const { data: existingUser, error: existingUserError } = yield supabase_1.supabase
                    .from('users')
                    .select('email')
                    .eq('email', email)
                    .single();
                if (existingUser) {
                    return res.status(409).send({ code: 409, message: 'Аккаунт уже зарегистрирован' });
                }
                const hashedPassword = yield bcrypt.hash(password, 10);
                const { data, error } = yield supabase_1.supabase
                    .from('users')
                    .insert([{ name, email, hashed_password: hashedPassword }])
                    .single();
                if (error) {
                    throw error;
                }
                return res.status(201).send({ code: 201, message: 'Аккаунт зарегистрирован', data: { name, email } });
            }
            catch (e) {
                console.error(e);
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { data: userData, error } = yield supabase_1.supabase
                    .from('users')
                    .select('*')
                    .eq('email', email)
                    .single();
                if (error || !userData.id) {
                    return res.status(401).send({ code: 401, message: 'Неправильный email или пароль' });
                }
                const isPasswordValid = yield bcrypt.compare(password, userData.hashed_password);
                if (!isPasswordValid) {
                    return res.status(401).send({ code: 401, message: 'Неправильный email или пароль' });
                }
                res.cookie('user_password', userData.hashed_password, { httpOnly: true });
                const { name, id, avatar } = userData;
                const messages = yield (0, fetchUserMessages_1.fetchUserMessages)(id);
                const users = yield (0, fetchUsersName_1.fetchUsersName)();
                return res.status(200).send({
                    message: 'Успешная аутентификация',
                    data: { userData: { name, id, avatar }, messages, users }
                });
            }
            catch (e) {
                console.error(e);
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = req.cookies.user_password;
                if (!password) {
                    return res.status(401).json({ message: 'Не авторизован в токене', statusCode: 401 });
                }
                const { data: userData, error } = yield supabase_1.supabase
                    .from('users')
                    .select('name, email, id, avatar')
                    .eq('hashed_password', password)
                    .single();
                if (error) {
                    throw error;
                }
                if (!userData) {
                    return res.status(404).json({ message: 'Пользователь не найден', statusCode: 404 });
                }
                const messages = yield (0, fetchUserMessages_1.fetchUserMessages)(userData.id);
                const users = yield (0, fetchUsersName_1.fetchUsersName)();
                return res.status(200).json({
                    message: 'Успешно',
                    data: { userData, messages, users }
                });
            }
            catch (e) {
                console.error(e);
                res.status(400).json({ message: 'Me error', statusCode: 400 });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('user_password');
                return res.status(200).send({ code: 200, message: 'Успешный выход из системы' });
            }
            catch (e) {
                console.error(e);
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
}
module.exports = new AuthController();
