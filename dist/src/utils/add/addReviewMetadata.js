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
exports.addReviewMetadata = void 0;
const fetchImagesByReviewId_1 = require("../fetch/fetchImagesByReviewId");
const fetchProductsDataByReviewId_1 = require("../fetch/fetchProductsDataByReviewId");
const fetchUsersByLikes_1 = require("../fetch/fetchUsersByLikes");
const fetchUsersByRatings_1 = require("../fetch/fetchUsersByRatings");
const fetchTotalLikesByUser_1 = require("../fetch/fetchTotalLikesByUser");
function addReviewMetadata(review) {
    return __awaiter(this, void 0, void 0, function* () {
        const likedUserIds = yield (0, fetchUsersByLikes_1.fetchUsersByLikes)(review.id);
        const ratedUserIds = yield (0, fetchUsersByRatings_1.fetchUsersByRatings)(review.id);
        const totalAuthorLikes = yield (0, fetchTotalLikesByUser_1.fetchTotalLikesByUser)(review.author_id);
        const images = yield (0, fetchImagesByReviewId_1.fetchImagesByReviewId)(review.id);
        const { title, assessment, avg_assessment } = yield (0, fetchProductsDataByReviewId_1.fetchProductsDataByReviewId)(review.id);
        review.avg_assessment = avg_assessment;
        review.title = title;
        review.assessment = assessment;
        review.likes = likedUserIds;
        review.ratings = ratedUserIds;
        review.authorLikes = totalAuthorLikes;
        review.images = images;
        return review;
    });
}
exports.addReviewMetadata = addReviewMetadata;
