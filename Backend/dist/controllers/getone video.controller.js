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
exports.getSingleVideo = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const video_model_1 = require("../models/video.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const dbConnect_1 = __importDefault(require("../utils/dbConnect"));
exports.getSingleVideo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_1.default)();
    const { id } = req.params;
    const video = yield video_model_1.Video.findById(id);
    if (!video) {
        return res.status(404).json(new ApiResponse_1.ApiResponse(404, null, "Video not found"));
    }
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, video, "Video fetched successfully"));
}));
