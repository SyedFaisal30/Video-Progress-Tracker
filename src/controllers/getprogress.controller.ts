import { Request, Response } from 'express';
import { Progress } from '../models/progress.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import dbConnect from '../utils/dbConnect';

export const getUserVideoProgress = asyncHandler(async (req: Request, res: Response) => {
  await dbConnect();

  const { username, videoId } = req.params;

  if (!username || !videoId) {
    return res.status(400).json(new ApiResponse(400, null, "username and videoId are required"));
  }

  const progress = await Progress.findOne({ username, videoId }).populate("videoId");

  if (!progress) {
    return res.status(200).json(new ApiResponse(200, null, "No progress found - new video for this user"));
  }

  // Progress found - return it
  return res.status(200).json(new ApiResponse(200, progress, "Fetched user progress"));
});
