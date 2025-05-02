import mongoose, { Schema, Document } from "mongoose";

export interface IProgress extends Document {
  userId: string;
  videoId: mongoose.Schema.Types.ObjectId;
  videoLength: number;
  watchedPercentage: number;
  completed: boolean;
  rewatched: boolean;
  lastWatchedPosition: number;
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { type: String, required: true },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    videoLength: { type: Number, required: true },
    watchedPercentage: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    rewatched: { type: Boolean, default: false },
    lastWatchedPosition: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Progress = mongoose.model<IProgress>("Progress", ProgressSchema);
