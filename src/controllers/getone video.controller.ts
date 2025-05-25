import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { Video } from '../models/video.model';
import { ApiResponse } from '../utils/ApiResponse';
import dbConnect from '../utils/dbConnect';

export const getSingleVideo = asyncHandler(async (req: Request, res: Response) => {
  await dbConnect();

  const { id } = req.params;

  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).json(new ApiResponse(404, null, "Video not found"));
  }

  return res.status(200).json(new ApiResponse(200, video, "Video fetched successfully"));
});
