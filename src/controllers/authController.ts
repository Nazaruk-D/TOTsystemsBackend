import {Request, Response} from "express";

class AuthController {
    async registration (req: Request, res: Response) {
        try {
            const {name, email, password} = req.body
            console.log(name, email, password)
            return res.status(200).send({message: 'ok'});
        } catch (e) {
            return res.status(500).send({message: 'Internal server error'});
        }
    }
}

module.exports = new AuthController();
