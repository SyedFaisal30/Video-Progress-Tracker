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
    <div className="bg-blue-50 min-h-screen py-10 w-screen overflow-x-hidden">
      <div className="w-full px-3">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Video Gallery
        </h1>
  
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {videos.map((video) => (
              <Link
                to={`/track/${video._id}`}
                key={video._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-[45%] md:w-[30%] lg:w-[31%] xl:w-[18%] hover:shadow-xl transition-shadow duration-300"
              >
                <video
                  controls
                  className="w-full h-56 object-cover rounded-t-lg pointer-events-none"
                  src={video.videoUrl}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {video.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Length: {convertToMinutes(video.videoLength)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Videos;
