# 🎥 Frontend – Video Progress Tracker

This is the React frontend for tracking user video watching progress. It records intervals the user watches, calculates total watched percentage, and saves the state to the backend.

---

## ⚙️ Tech Stack

- React + TypeScript
- Axios for API requests
- Tailwind CSS for styling
- React Router for dynamic routing
- Vite for fast builds

---

## 🛠️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/video-progress-frontend.git
   cd video-progress-frontend
Install dependencies:


npm install
Create a .env file with your backend URL:


VITE_SERVER_URL=http://localhost:5000
Start the development server:

npm run dev
📂 Folder Structure

src/
├── components/
│   └── TrackProgress.tsx   # Core video player and tracking logic
├── types/
│   └── types.ts            # Shared interfaces
├── App.tsx
├── main.tsx
└── index.css
🚀 Features
Dynamic video loading via route params

Real-time progress tracking while watching

Skip detection (if the user jumps more than 2 seconds)

Interval merging and percentage calculation

Progress saving to backend

Completion status update (≥98% watched)

🔍 How Progress Tracking Works
1. Video Intervals
On every onTimeUpdate, the player:

Starts or updates a currentInterval

Detects skips if jump > 2 seconds

Merges all watched intervals before calculation

2. Watched Percentage Calculation

const watchedTime = merged.reduce((sum, i) => sum + (i.end - i.start), 0);
const percent = Math.floor((watchedTime / videoDuration) * 100);
3. Completion Flag

if (percent >= 98) setIsCompleted(true);
4. Saving Progress
When the user clicks "Save Progress", the current interval is finalized and a POST request is sent to:


POST /api/progress
Payload:


{
  "userId": "user123",
  "videoId": "abc123",
  "watchedIntervals": [...],
  "lastWatchedPosition": 156.23
}
🧪 Sample Usage
Go to:
http://localhost:5173/watch/abc123

Watch a video for a few seconds.

Click Save Progress – backend saves progress.

Refresh page – your progress is retained.

📬 Author
Syed Faisal Abdul Rahman Zulfequar
sfarz172320@gmail.com