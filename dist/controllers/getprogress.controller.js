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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserVideoProgress = void 0;
const progress_model_1 = require("../models/progress.model");
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiResponse_1 = require("../utils/ApiResponse");
const dbConnect_1 = __importDefault(require("../utils/dbConnect"));
exports.getUserVideoProgress = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_1.default)();
    const { username, videoId } = req.params;
    if (!username || !videoId) {
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, null, "username and videoId are required"));
    }
    const progress = yield progress_model_1.Progress.findOne({ username, videoId }).populate("videoId");
    if (!progress) {
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, null, "No progress found - new video for this user"));
    }
    // Progress found - return it
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, progress, "Fetched user progress"));
}));
