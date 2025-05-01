import { Request, Response } from 'express'
import { Progress } from '../models/progress'
import { mergeIntervals } from '../utils/mergeIntervals'

export const saveProgress = async (req: Request, res: Response): Promise<void> => {
  const { userId, videoId, watchedIntervals, lastWatchedPosition } = req.body

  const existing = await Progress.findOne({ userId, videoId })

  if (existing) {
    existing.watchedIntervals = mergeIntervals([
      ...existing.watchedIntervals,
      ...watchedIntervals,
    ])
    existing.lastWatchedPosition = lastWatchedPosition
    await existing.save()
    res.json({ status: 'updated' })
    return
  }

  await Progress.create({ userId, videoId, watchedIntervals, lastWatchedPosition })
  res.json({ status: 'created' })
}

export const getProgress = async (req: Request, res: Response): Promise<void> => {
  const { userId, videoId } = req.query
  const progress = await Progress.findOne({ userId, videoId })
  res.json(progress || {})
}
