import mongoose, { Schema, Document } from 'mongoose'

export interface Interval {
  start: number
  end: number
}

export interface IProgress extends Document {
  userId: string
  videoId: string
  watchedIntervals: Interval[]
  lastWatchedPosition: number
}

const ProgressSchema = new Schema<IProgress>({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  watchedIntervals: [{ start: Number, end: Number }],
  lastWatchedPosition: Number,
})

export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema)
