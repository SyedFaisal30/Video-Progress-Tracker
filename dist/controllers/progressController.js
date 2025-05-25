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
exports.getProgress = exports.saveProgress = void 0;
const progress_model_1 = require("../models/progress.model");
const video_model_1 = require("../models/video.model");
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiResponse_1 = require("../utils/ApiResponse");
const dbConnect_1 = __importDefault(require("../utils/dbConnect"));
exports.saveProgress = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure DB connection before processing the request
    yield (0, dbConnect_1.default)();
    const { userId, videoId, lastWatchedPosition } = req.body;
    // Check if the required parameters are provided
    if (!userId || !videoId) {
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, null, "userId and videoId are required"));
    }
    const video = yield video_model_1.Video.findById(videoId);
    if (!video) {
        return res.status(404).json(new ApiResponse_1.ApiResponse(404, null, "Video not found"));
    }
    const existingProgress = yield progress_model_1.Progress.findOne({ userId, videoId });
    // If the video is already completed, prevent further tracking
    if (existingProgress && existingProgress.completed) {
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, null, "Video already completed. Rewatch progress not tracked."));
    }
    // Calculate the watched percentage based on the last watched position
    const watchedPercentage = Math.min((lastWatchedPosition / video.videoLength) * 100, 100);
    const completed = watchedPercentage >= 95;
    if (existingProgress) {
        // Update existing progress
        existingProgress.lastWatchedPosition = lastWatchedPosition;
        existingProgress.watchedPercentage = watchedPercentage;
        existingProgress.completed = completed;
        if (completed)
            existingProgress.rewatched = true;
        yield existingProgress.save();
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, existingProgress, "Progress updated"));
    }
    // Create new progress entry
    const newProgress = yield progress_model_1.Progress.create({
        userId,
        videoId,
        videoLength: video.videoLength,
        watchedPercentage,
        completed,
        rewatched: false,
        lastWatchedPosition,
    });
    return res.status(201).json(new ApiResponse_1.ApiResponse(201, newProgress, "Progress created"));
}));
exports.getProgress = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure DB connection before processing the request
    yield (0, dbConnect_1.default)();
    const { userId, videoId } = req.query;
    // Validate required query parameters
    if (!userId || !videoId) {
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, null, "userId and videoId are required"));
    }
    const progress = yield progress_model_1.Progress.findOne({ userId, videoId }).populate('videoId');
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, progress || {}, "Fetched user progress"));
}));
