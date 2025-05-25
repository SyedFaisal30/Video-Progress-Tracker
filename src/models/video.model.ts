import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  videoUrl: string;
  videoLength: number;
  title: string;
  description?: string;
}

const VideoSchema = new Schema<IVideo>({
  videoUrl: { type: String, required: true },
  videoLength: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
}, { timestamps: true });

export const Video = mongoose.model<IVideo>('Video', VideoSchema);
