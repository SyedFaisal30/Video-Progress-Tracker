import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Videos from "./components/videos";
import TrackProgress from "./components/trackprogress";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-50">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-semibold">🎬 Video Progress Tracker</h1>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <div className="max-w-7xl mx-auto">
            <Routes>
              {/* Video Gallery */}
              <Route path="/" element={<Videos />} />
              
              {/* Track Video Progress */}
              <Route path="/track/:videoId" element={<TrackProgress />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
