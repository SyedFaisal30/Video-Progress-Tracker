import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Videos from "./pages/videos";
import TrackProgress from "./pages/trackprogress";
import Header from "./components/header";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-50">
        {/* Header */}
        <Header/>
        {/* Main Content */}
        <main>
          <div className="w-screen overflow-x-hidden mx-auto">
            <Routes>
              <Route path="/" element={<Videos />} />
              <Route path="/track/:videoId" element={<TrackProgress />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
