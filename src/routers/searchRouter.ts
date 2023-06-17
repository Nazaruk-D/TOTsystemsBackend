import {EndPoints} from "../enum/endPoints";
const Search = require('express')
const searchController = require('../controllers/searchController')
const searchRouter = new Search()


searchRouter.get(EndPoints.Get_Message, searchController.getReviews)

module.exports = searchRouter