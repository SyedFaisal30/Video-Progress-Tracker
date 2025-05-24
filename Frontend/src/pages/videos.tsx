import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Videos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/videos`
        );
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const convertToMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleVideoClick = (videoId: string) => {
    setSelectedVideoId(videoId);
    setShowModal(true);
    setUsername("");
    setError(null);
  };

  const handleUsernameSubmit = async () => {
  if (!username.trim()) {
    setError("Username is required");
    return;
  }

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/users/check-username/${username.trim()}`
    );
    
    // localStorage.setItem("userId", res.data.data._id); // store _id
    localStorage.setItem("username", res.data.data.username);

    navigate(`/track/${selectedVideoId}?username=${encodeURIComponent(username.trim())}`);
  } catch (err: any) {
    if (err.response?.status === 409) {
      setError("Username already taken. Try a different one.");
    } else {
      setError("Something went wrong. Try again.");
    }
  }
};


  return (
    <div className="bg-black min-h-screen w-screen text-white py-10 px-6 overflow-x-hidden">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-10 tracking-wide">
        Video Gallery
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-red-500 border-dotted rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="relative group aspect-square bg-zinc-900 rounded-xl overflow-hidden transition-transform hover:scale-105 shadow-md hover:shadow-2xl cursor-pointer"
              onClick={() => handleVideoClick(video._id)}
            >
              <video
                className="w-full h-full object-cover pointer-events-none"
                src={video.videoUrl + "#t=0.1"}
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <h2 className="text-white text-lg font-semibold truncate">
                  {video.title}
                </h2>
                <p className="text-sm text-gray-300">
                  Duration: {convertToMinutes(video.videoLength)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4 text-black">Enter a Unique Username</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
              placeholder="e.g. john_doe123"
            />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={handleUsernameSubmit}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Continue
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
