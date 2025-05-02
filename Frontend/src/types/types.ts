export interface Progress {
  userId: string;
  videoId: string;
  videoLength: number;
  watchedPercentage: number;
  completed: boolean;
  rewatched: boolean;
  lastWatchedPosition: number;
}

export interface Interval {
  start: number;
  end: number;
}
