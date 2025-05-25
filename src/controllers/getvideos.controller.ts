import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { Video } from '../models/video.model';
import { ApiResponse } from '../utils/ApiResponse';
import dbConnect from '../utils/dbConnect';

export const getVideos = asyncHandler(async (req: Request, res: Response) => {
  await dbConnect();
  
  const videos = await Video.find();
  return res.status(200).json(new ApiResponse(200, videos, "Videos fetched successfully"));
});
