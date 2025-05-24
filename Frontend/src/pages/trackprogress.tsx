import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { saveProgress, getProgress } from "../services/progressService";
import { Progress } from "../types/types";

const TrackProgress = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [username, setUsername] = useState<string | null>(null);
  const [, setProgress] = useState<Progress | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [watchedPercentage, setWatchedPercentage] = useState<number>(0);
  const [isNewVideo, setIsNewVideo] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      setError("No userId found. Please enter your username first.");
      return;
    }
    setUsername(storedUsername);

    const fetchVideoAndProgress = async () => {
      try {
        console.log("[fetchVideoAndProgress] Fetching video metadata...");
        const videoRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/videos/${videoId}`);
        const videoJson = await videoRes.json();
        setVideoUrl(videoJson.data.videoUrl);
        console.log("[fetchVideoAndProgress] Video URL:", videoJson.data.videoUrl);

        console.log(`[fetchVideoAndProgress] Fetching progress for ${storedUsername} / ${videoId}`);
        const data = await getProgress(storedUsername, videoId || "");
        if (data) {
          console.log("[fetchVideoAndProgress] Progress data:", data);
          setProgress(data);
          setIsCompleted(data.completed);
          setWatchedPercentage(data.watchedPercentage);
          setIsNewVideo(false);
          if (videoRef.current) {
            videoRef.current.currentTime = data.lastWatchedPosition || 0;
          }
        } else {
          console.log("[fetchVideoAndProgress] No progress found, new video");
          setIsNewVideo(true);
          setWatchedPercentage(0);
          setIsCompleted(false);
          setProgress(null);
        }
      } catch (err) {
        console.error("[fetchVideoAndProgress] Error loading video or progress:", err);
        setError("Failed to load video or progress.");
      }
    };

    if (videoId) fetchVideoAndProgress();
  }, [videoId]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const current = video.currentTime;
    const duration = video.duration;
    const percent = Math.floor((current / duration) * 100);

    setWatchedPercentage(percent);
    if (percent >= 98) setIsCompleted(true);
  };

  const handleUpdateProgress = async () => {
    const video = videoRef.current;
    if (!video || !videoId || !username) return;

    video.pause();
    const lastPosition = video.currentTime;

    console.log("[handleUpdateProgress] Saving progress with data:", {
      username,
      videoId,
      lastPosition,
      watchedPercentage,
      isCompleted,
      rewatched: false,
    });

    try {
      const updated = await saveProgress(
        username,
        videoId,
        lastPosition,
        watchedPercentage,
        isCompleted,
        false
      );
      console.log("[handleUpdateProgress] Progress saved successfully:", updated);
      setProgress(updated);
      setIsCompleted(updated.completed);
      setWatchedPercentage(updated.watchedPercentage);
      setError(null);
      setIsNewVideo(false); // after save, no longer new video
    } catch (err) {
      console.error("[handleUpdateProgress] Failed to save progress:", err);
      setError("Failed to update progress.");
    }
  };

  const handleRewatch = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setWatchedPercentage(0);
      setIsCompleted(false);
    }
  };

  return (
    <div className="p-6 w-screen max-w-none bg-zinc-900 text-white rounded-lg shadow-md min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-6">
        🎥 Track Video Progress
      </h2>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      {isNewVideo && (
        <p className="text-green-400 font-semibold text-center mb-4">
          🆕 New video — let's complete it!
        </p>
      )}

      {videoUrl ? (
        <video
          ref={videoRef}
          controls
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          className="w-full h-auto aspect-video mb-4 rounded-xl shadow-lg"
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
        />
      ) : (
        <p className="text-gray-400">Loading video...</p>
      )}

      <div className="w-full bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
        <div
          className="bg-blue-500 h-4 transition-all duration-500"
          style={{ width: `${watchedPercentage}%` }}
        ></div>
      </div>

      <p className="text-gray-300 font-medium mb-4">
        👁️ Watched: {watchedPercentage}%
      </p>

      <div className="flex justify-between items-center">
        <button
          onClick={isCompleted ? handleRewatch : handleUpdateProgress}
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
