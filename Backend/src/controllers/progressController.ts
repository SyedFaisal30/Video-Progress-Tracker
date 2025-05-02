import { Request, Response } from 'express';
import { Progress } from '../models/progress.model';
import { Video } from '../models/video.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import dbConnect from '../utils/dbConnect';

export const saveProgress = asyncHandler(async (req: Request, res: Response) => {
  // Ensure DB connection before processing the request
  await dbConnect();

  const { userId, videoId, lastWatchedPosition } = req.body;

  // Check if the required parameters are provided
  if (!userId || !videoId) {
    return res.status(400).json(new ApiResponse(400, null, "userId and videoId are required"));
  }

  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json(new ApiResponse(404, null, "Video not found"));
  }

  const existingProgress = await Progress.findOne({ userId, videoId });

  // If the video is already completed, prevent further tracking
  if (existingProgress && existingProgress.completed) {
    return res.status(200).json(new ApiResponse(200, null, "Video already completed. Rewatch progress not tracked."));
  }

  // Calculate the watched percentage based on the last watched position
  const watchedPercentage = Math.min((lastWatchedPosition / video.videoLength) * 100, 100);
  const completed = watchedPercentage >= 95;

  if (existingProgress) {
    // Update existing progress
    existingProgress.lastWatchedPosition = lastWatchedPosition;
    existingProgress.watchedPercentage = watchedPercentage;
    existingProgress.completed = completed;
    if (completed) existingProgress.rewatched = true;
    await existingProgress.save();
    return res.status(200).json(new ApiResponse(200, existingProgress, "Progress updated"));
  }

  // Create new progress entry
  const newProgress = await Progress.create({
    userId,
    videoId,
    videoLength: video.videoLength,
    watchedPercentage,
    completed,
    rewatched: false,
    lastWatchedPosition,
  });

  return res.status(201).json(new ApiResponse(201, newProgress, "Progress created"));
});

export const getProgress = asyncHandler(async (req: Request, res: Response) => {
  // Ensure DB connection before processing the request
  await dbConnect();

  const { userId, videoId } = req.query;

  // Validate required query parameters
  if (!userId || !videoId) {
    return res.status(400).json(new ApiResponse(400, null, "userId and videoId are required"));
  }

  const progress = await Progress.findOne({ userId, videoId }).populate('videoId');
  return res.status(200).json(new ApiResponse(200, progress || {}, "Fetched user progress"));
});
