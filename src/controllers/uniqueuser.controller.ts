import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { User } from '../models/user.model';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import dbConnect from '../utils/dbConnect';

export const checkOrCreateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await dbConnect();

  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, false, "Username is required");
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new ApiError(409, false, "Username already exists");
  }

  const newUser = new User({ username });
  await newUser.save();

  return res.status(201).json(new ApiResponse(201, newUser, "Username created successfully"));
});
