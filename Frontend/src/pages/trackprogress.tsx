import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Progress } from "../types/types";

interface Interval {
  start: number;
  end: number;
}

const TrackProgress = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [, setProgress] = useState<Progress | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [watchedPercentage, setWatchedPercentage] = useState<number>(0);
  const [watchedIntervals, setWatchedIntervals] = useState<Interval[]>([]);
  const currentIntervalRef = useRef<Interval | null>(null);
  const videoDurationRef = useRef<number>(0);

  useEffect(() => {
    const fetchVideoAndProgress = async () => {
      try {
        const videoRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/videos/${videoId}`
        );
        setVideoUrl(videoRes.data.data.videoUrl);

        const progressRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/progress`,
          { params: { userId: "user123", videoId } }
        );

        const data = progressRes.data.data;
        if (data) {
          setProgress(data);
        }
      } catch (err) {
        setError("Failed to load video or progress.");
      }
    };

    if (videoId) fetchVideoAndProgress();
  }, [videoId]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const current = video.currentTime;
    const duration = video.duration;
    videoDurationRef.current = duration;

    if (!currentIntervalRef.current) {
      currentIntervalRef.current = { start: current, end: current };
    } else {
      currentIntervalRef.current.end = current;
    }

    const allIntervals = [...watchedIntervals];
    if (currentIntervalRef.current) {
      allIntervals.push(currentIntervalRef.current);
    }

    const merged = mergeIntervals(allIntervals);
    const watchedTime = merged.reduce((sum, i) => sum + (i.end - i.start), 0);
    const percent = Math.floor((watchedTime / duration) * 100);

    setWatchedPercentage(percent);
    if (percent >= 98) setIsCompleted(true);
  };

  const handleSeeking = () => {
    if (currentIntervalRef.current) {
      setWatchedIntervals(prev => [...prev, currentIntervalRef.current!]);
      currentIntervalRef.current = null;
    }
  };

  const handleUpdateProgress = async () => {
    const video = videoRef.current;
    if (!videoId || !video) return;

    video.pause();

    if (currentIntervalRef.current) {
      setWatchedIntervals(prev => [...prev, currentIntervalRef.current!]);
      currentIntervalRef.current = null;
    }

    const allIntervals = mergeIntervals(watchedIntervals);
    const lastPosition = video.currentTime;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/progress`,
        {
          userId: "user123",
          videoId,
          watchedIntervals: allIntervals,
          lastWatchedPosition: lastPosition,
        }
      );
      setProgress(res.data.data);
      setIsCompleted(res.data.data.completed);
    } catch (err) {
      setError("Failed to update progress.");
    }
  };

  const mergeIntervals = (intervals: Interval[]): Interval[] => {
    if (intervals.length === 0) return [];
    const sorted = intervals.sort((a, b) => a.start - b.start);
    const merged: Interval[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const prev = merged[merged.length - 1];
      const curr = sorted[i];
      if (curr.start <= prev.end + 1) {
        prev.end = Math.max(prev.end, curr.end);
      } else {
        merged.push(curr);
      }
    }
    return merged;
  };

  return (
    <div className="p-6 w-screen max-w-none bg-zinc-900 text-white rounded-lg shadow-md min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-6">🎥 Track Video Progress</h2>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      {videoUrl ? (
        <video
          ref={videoRef}
          controls
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          className="w-full h-auto aspect-video mb-4 rounded-xl shadow-lg"
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeeking}
        />
      ) : (
        <p className="text-gray-400">Loading video...</p>
      )}

      <p className="text-gray-300 font-medium mb-4">👁️ Watched: {watchedPercentage}%</p>

      <div className="flex justify-between items-center">
        <button
          onClick={handleUpdateProgress}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300"
        >
          {isCompleted ? "Rewatch" : "Save Progress"}
        </button>
        <span className="text-sm text-gray-400">
          {isCompleted ? "✅ Video Completed" : "🕓 Video In Progress"}
        </span>
      </div>
    </div>
  );
};

export default TrackProgress;
