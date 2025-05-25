# 🧠 Backend – Video Progress Tracker

This is the backend service for tracking a user's progress while watching videos. It supports storing **watched intervals**, **last watched position**, and **completion status**.

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- TypeScript (optional)
- CORS, dotenv, body-parser, etc.

---

## 🛠️ Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/video-progress-backend.git
   cd video-progress-backend
Install dependencies:


npm install
Create a .env file:


PORT=5000
MONGODB_URI=mongodb://localhost:27017/video-progress
Start the server:


npm run dev
🔌 API Endpoints
✅ GET /api/videos/:videoId
Fetches the video metadata (e.g., video URL) for the frontend player.

Sample Response:

{
  "data": {
    "videoId": "abc123",
    "videoUrl": "https://example.com/video.mp4",
    "title": "Sample Video"
  }
}
✅ GET /api/progress?userId=...&videoId=...
Fetches the user's saved progress for a given video.

Sample Response:

{
  "data": {
    "userId": "user123",
    "videoId": "abc123",
    "watchedIntervals": [
      { "start": 0, "end": 30 },
      { "start": 60, "end": 120 }
    ],
    "lastWatchedPosition": 120,
    "completed": false
  }
}
✅ POST /api/progress
Saves or updates a user's progress for a video.

Request Body:

{
  "userId": "user123",
  "videoId": "abc123",
  "watchedIntervals": [
    { "start": 0, "end": 30 },
    { "start": 60, "end": 120 }
  ],
  "lastWatchedPosition": 120
}
Backend Logic:
✅ Merge overlapping intervals

✅ Calculate total watched time

✅ Calculate watched percentage

✅ Mark video as completed if watched ≥ 98%

✅ Save or update progress in MongoDB

Sample Response:

{
  "data": {
    "userId": "user123",
    "videoId": "abc123",
    "watchedIntervals": [...],
    "lastWatchedPosition": 120,
    "completed": true
  }
}
🧠 Progress Tracking Logic
Intervals Merging Logic:


intervals.sort((a, b) => a.start - b.start);
const merged = [intervals[0]];
for (let i = 1; i < intervals.length; i++) {
  const last = merged[merged.length - 1];
  if (intervals[i].start <= last.end + 1) {
    last.end = Math.max(last.end, intervals[i].end);
  } else {
    merged.push(intervals[i]);
  }
}
Watched Percentage:


const totalWatched = merged.reduce((sum, i) => sum + (i.end - i.start), 0);
const percent = (totalWatched / videoDuration) * 100;
Completion:

If percent >= 98, mark the video as completed.

🗃️ MongoDB Schema
Video Model

{
  videoId: String,
  videoUrl: String,
  title: String,
  ...
}
Progress Model

{
  userId: String,
  videoId: String,
  watchedIntervals: [{ start: Number, end: Number }],
  lastWatchedPosition: Number,
  completed: Boolean
}
📬 Author
Syed Faisal Abdul Rahman Zulfequar
sfarz172320@gmail.com
