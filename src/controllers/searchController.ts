import {Request, Response} from "express";

class SearchController {
    async getReviews(req: Request, res: Response) {
        try {
            return res.status(200).send({message: 'ok'});
        } catch (e) {
            return res.status(500).send({message: 'Internal server error'});
        }
    }
}

module.exports = new SearchController()