import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Videos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
            <Link
              to={`/track/${video._id}`}
              key={video._id}
              className="relative group aspect-square bg-zinc-900 rounded-xl overflow-hidden transition-transform hover:scale-105 shadow-md hover:shadow-2xl"
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
