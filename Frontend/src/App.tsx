import { useEffect, useRef, useState } from "react";
import { Interval } from "./types/types";
import { mergeIntervals } from "./utils/mergeIntervals";
import { fetchProgress, saveProgress } from "./services/api";

const userId = "tester";

// Debounce function
const debounce = (func: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

// Video list
const videoList = [
  {
    id: "abc1",
    title: "Big Buck Bunny",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "abc2",
    title: "Nature Clip",
    src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: "abc3",
    title: "Bear Video",
    src: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: "abc4",
    title: "Sintel Trailer",
    src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  },
  {
    id: "abc5",
    title: "Bunny Trailer",
    src: "https://media.w3.org/2010/05/bunny/trailer.mp4",
  },
  {
    id: "abc6",
    title: "Movie 300",
    src: "https://media.w3.org/2010/05/video/movie_300.mp4",
  },
  {
    id: "abc7",
    title: "Flowers",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: "abc8",
    title: "Bees",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/bee.mp4",
  },
  {
    id: "abc9",
    title: "City Street",
    src: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: "abc10",
    title: "Demo Clip",
    src: "https://file-examples.com/wp-content/uploads/2018/04/file_example_MP4_640_3MG.mp4",
  },
];

function VideoPlayer({ videoId, src, title }: { videoId: string; src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [watched, setWatched] = useState<Interval[]>([]);
  const [lastTime, setLastTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const debouncedSave = debounce(() => {
    saveProgress(userId, videoId, watched, lastTime);
  }, 3000);

  useEffect(() => {
    fetchProgress(userId, videoId).then((data) => {
      const lastWatched = data.lastWatchedPosition || 0;
      setWatched(data.watchedIntervals || []);
      setLastTime(lastWatched);
      if (videoRef.current && lastWatched > 0) {
        videoRef.current.currentTime = lastWatched;
      }
    });
  }, [videoId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video || video.paused || video.ended) return;
      const currentTime = video.currentTime;
      if (isNaN(currentTime) || currentTime <= 0 || duration === 0) return;

      const newInterval: Interval = {
        start: Math.min(currentTime, duration),
        end: Math.min(currentTime + 1, duration),
      };

      let updated = [...watched];
      const isDuplicate = updated.some(
        (i) => Math.abs(i.start - newInterval.start) < 0.5 && Math.abs(i.end - newInterval.end) < 0.5
      );

      if (!isDuplicate) updated.push(newInterval);
      const merged = mergeIntervals(updated);
      setWatched(merged);

      const totalWatched = merged.reduce((sum, i) => sum + (i.end - i.start), 0);
      const newProgress = Math.min(100, Math.max(0, (totalWatched / duration) * 100));
      setProgress(newProgress);
      setLastTime(currentTime);
      debouncedSave();
    }, 1000);

    return () => clearInterval(interval);
  }, [watched, duration]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <video
        ref={videoRef}
        controls
        className="w-full h-48 object-cover"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="p-4">
        <h3 className="text-md font-semibold mb-1 truncate">{title}</h3>
        <div className="text-sm text-gray-600">Progress: {progress.toFixed(2)}%</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">🎬 Video Progress Tracker</h1>
          <p className="text-gray-600 hidden sm:block">Track your progress on each video</p>
        </div>
      </header>

      {/* Video Grid */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {videoList.map((video) => (
            <VideoPlayer key={video.id} videoId={video.id} src={video.src} title={video.title} />
          ))}
        </div>
      </main>
    </div>
  );
}
