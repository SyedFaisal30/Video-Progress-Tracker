<<<<<<< HEAD
# 🎥 Video Progress Tracker

A React component that allows users to **watch a video**, track which parts they watched (with skip detection), and **save their progress** with intervals and last watched time.

---

## 🚀 Features

- ✅ Tracks watched portions of a video using time intervals
- 🚫 Detects skip events and records only watched segments
- 💾 Saves progress with API (including `watchedIntervals` and `lastWatchedPosition`)
- 📊 Displays watched percentage and completion status
- 🔁 Allows rewatching and resaving

---

## 📦 Technologies Used

- React
- TypeScript
- Axios
- React Router (`useParams`)
- Backend API (URL via `VITE_SERVER_URL`)
=======
# 🧠 Backend – Video Progress Tracker

This is the backend service for tracking a user's progress while watching videos. It supports storing **watched intervals**, **last watched position**, and **completion status**.

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- TypeScript (optional)
- CORS, dotenv, body-parser, etc.
>>>>>>> 981501737c9cadbf14831721f2a0d0c0d1c1627b

---

## 🛠️ Setup

<<<<<<< HEAD
1. Clone the repo and install dependencies:
   ```bash
   npm install
Set your environment variable:

VITE_SERVER_URL=http://localhost:5000
Ensure your backend exposes:

GET /api/videos/:videoId

GET /api/progress?userId=...&videoId=...

POST /api/progress

Add the TrackProgress component in your route:


<Route path="/track/:videoId" element={<TrackProgress />} />
🧠 Progress Tracking Logic
1. Detecting Watch Intervals
As the video plays, we record continuous segments as { start, end } intervals.

If the user skips ahead more than 2 seconds, the current interval is ended and a new one begins.

2. Handling Seeking
When seeking happens (onSeeking), we finalize the current interval and store it.

3. Merging Intervals
Before saving, all intervals are merged to avoid duplicates or overlaps:


if (curr.start <= prev.end + 1) {
  prev.end = Math.max(prev.end, curr.end);
}
4. Calculating Watched Percentage

watchedTime = sum of all merged interval durations
watchedPercentage = (watchedTime / videoDuration) * 100
If watchedPercentage >= 98%, the video is marked as completed.

5. Saving Progress
When the user clicks "Save Progress":

The video is paused.

The final interval is saved (if any).

A POST request is sent:


{
  "userId": "user123",
  "videoId": "...",
  "watchedIntervals": [...],
  "lastWatchedPosition": 123.45
}
The backend updates the database and returns the new progress, which updates the UI.

📂 Example Response from Backend
=======
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
>>>>>>> 981501737c9cadbf14831721f2a0d0c0d1c1627b

{
  "data": {
    "videoId": "abc123",
<<<<<<< HEAD
    "userId": "user123",
    "watchedIntervals": [
      { "start": 0, "end": 40 },
      { "start": 60, "end": 90 }
    ],
    "lastWatchedPosition": 90,
    "completed": false
  }
}
📸 UI Snapshot
Shows video player

Progress bar: Watched: 70%

Button: Save Progress / Rewatch

Status: Video In Progress / Video Completed

📬 Contact
Built by Syed Faisal Abdul Rahman Zulfequar
sfar172320@gmail.com









=======
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
>>>>>>> 981501737c9cadbf14831721f2a0d0c0d1c1627b
