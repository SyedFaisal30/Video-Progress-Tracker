import { Request, Response } from 'express';
import { Progress } from '../models/progress.model';
import { Video } from '../models/video.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import dbConnect from '../utils/dbConnect';

export const saveProgress = asyncHandler(async (req: Request, res: Response) => {
  await dbConnect();

  const { username, videoId, lastWatchedPosition } = req.body;

  if (!username || !videoId) {
    return res.status(400).json(new ApiResponse(400, null, "username and videoId are required"));
  }

  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json(new ApiResponse(404, null, "Video not found"));
  }

  const existingProgress = await Progress.findOne({ username, videoId });

  if (existingProgress && existingProgress.completed) {
    return res.status(200).json(new ApiResponse(200, null, "Video already completed. Rewatch progress not tracked."));
  }

  const watchedPercentage = Math.min((lastWatchedPosition / video.videoLength) * 100, 100);
  const completed = watchedPercentage >= 95;

  if (existingProgress) {
    existingProgress.lastWatchedPosition = lastWatchedPosition;
    existingProgress.watchedPercentage = watchedPercentage;
    existingProgress.completed = completed;
    if (completed) existingProgress.rewatched = true;
    await existingProgress.save();
    return res.status(200).json(new ApiResponse(200, existingProgress, "Progress updated"));
  }

  const newProgress = await Progress.create({
    username,
    videoId,
    videoLength: video.videoLength,
    watchedPercentage,
    completed,
    rewatched: false,
    lastWatchedPosition,
  });

  return res.status(201).json(new ApiResponse(201, newProgress, "Progress created"));
});