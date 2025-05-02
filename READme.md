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

---

## 🛠️ Setup

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

{
  "data": {
    "videoId": "abc123",
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









