import axios from 'axios'
import { Interval } from '../types/types'

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/progress`

export const fetchProgress = async (userId: string, videoId: string) => {
  const res = await axios.get(BASE_URL, { params: { userId, videoId } })
  return res.data
}

export const saveProgress = async (
  userId: string,
  videoId: string,
  watchedIntervals: Interval[],
  lastWatchedPosition: number
) => {
  return await axios.post(BASE_URL, {
    userId,
    videoId,
    watchedIntervals,
    lastWatchedPosition,
  })
}
