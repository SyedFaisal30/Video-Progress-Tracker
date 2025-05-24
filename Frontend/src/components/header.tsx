import { useState } from "react";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = {
    name: "Syed Faisal",
    watchedVideos: ["React Basics", "Node.js Crash Course", "Advanced MongoDB"],
  };

  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Left: Title */}
        <h1 className="text-3xl font-bold tracking-wide">🎬 VPT</h1>

        {/* Right: Profile */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="hidden sm:inline-block text-sm">{user.name}</span>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-zinc-900 text-white rounded-lg shadow-lg z-50 p-4">
              <p className="text-sm font-semibold mb-2">👤 {user.name}</p>
              <p className="text-xs text-gray-300 mb-1">📺 Videos Watched:</p>
              <ul className="list-disc ml-5 space-y-1 text-sm text-gray-100">
                {user.watchedVideos.map((video, idx) => (
                  <li key={idx}>{video}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
