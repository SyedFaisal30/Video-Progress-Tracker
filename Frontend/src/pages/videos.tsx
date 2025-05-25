import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Video {
  _id: string;
  videoUrl: string;
  videoLength: number;
  title: string;
}

interface ProgressData {
  videoId: string;
  watchedPercentage: number;
  completed: boolean;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [progressMap, setProgressMap] = useState<Record<string, ProgressData>>({});
  const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
  const navigate = useNavigate();

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/videos`);
      setVideos(response.data.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's progress for all videos
  const fetchUserProgress = async (username: string) => {
    try {
      const responses = await Promise.all(
        videos.map((video) =>
          axios
            .get(`${import.meta.env.VITE_SERVER_URL}/api/progress/${username}/${video._id}`)
            .then((res) => ({
              videoId: video._id,
              watchedPercentage: res.data.data?.watchedPercentage || 0,
              completed: res.data.data?.completed || false,
            }))
            .catch(() => ({
              videoId: video._id,
              watchedPercentage: 0,
              completed: false,
            }))
        )
      );

      const map: Record<string, ProgressData> = {};
      responses.forEach((data) => {
        map[data.videoId] = data;
      });

      setProgressMap(map);
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };

  // Monitor username changes (e.g., logout or login)
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = localStorage.getItem("username");
      setUsername(currentUser);

      if (!currentUser) {
        setProgressMap({}); // Reset progress if no user
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Initial fetch of videos
  useEffect(() => {
    fetchVideos();
  }, []);

  // Fetch progress when username or video list changes
  useEffect(() => {
    if (username && videos.length > 0) {
      fetchUserProgress(username);
    } else {
      setProgressMap({});
    }
  }, [username, videos]);

  const convertToMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleVideoClick = (videoId: string) => {
    if (!username) {
      toast.warn("⚠️ Please login first to continue.");
      return;
    }

    navigate(`/track/${videoId}?username=${encodeURIComponent(username)}`);
  };

  return (
    <div className="mt-10 bg-gray-950 min-h-screen px-6 py-10 text-white w-screen overflow-x-hidden">
      <h1 className="text-4xl w-full font-bold text-center text-red-500 mb-10">
        🎥 Video Gallery
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-red-500 border-dotted rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video) => {
            const progress = progressMap[video._id];
            const watched = progress?.watchedPercentage || 0;
            const isCompleted = progress?.completed || false;

            return (
              <div
                key={video._id}
                onClick={() => handleVideoClick(video._id)}
                className="w-full bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-red-500/20 transition duration-300 cursor-pointer group"
              >
                <video
                  className="h-48 object-cover group-hover:opacity-80 transition"
                  src={video.videoUrl + "#t=0.1"}
                  preload="metadata"
                />

                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                  <p className="text-sm text-gray-400">
                    Duration: {convertToMinutes(video.videoLength)}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    {isCompleted ? (
                      <span className="px-3 py-1 bg-green-600 text-xs rounded-full">
                        ✅ Completed
                      </span>
                    ) : watched > 0 ? (
                      <div className="w-12 h-12">
                        <CircularProgressbar
                          value={watched}
                          text={`${Math.floor(watched)}%`}
                          styles={buildStyles({
                            pathColor: "#f87171",
                            textColor: "white",
                            trailColor: "#1f2937",
                          })}
                        />
                      </div>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-400 text-black text-xs rounded-full">
                        Not Started
                      </span>
                    )}

                    <span className="text-sm text-gray-500">Click to track</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Videos;
