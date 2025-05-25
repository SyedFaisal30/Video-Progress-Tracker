import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [inputUsername, setInputUsername] = useState("");

  const checkAndSetUsername = async (name: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/users/check-username/${encodeURIComponent(name)}`
      );

      localStorage.setItem("username", res.data.data.username);
      setUsername(res.data.data.username);
      setModalOpen(false);
      toast.success(`Welcome, ${res.data.data.username}!`);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error("Username already taken. Try a different one.");
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  const handleLogin = () => {
    if (inputUsername.trim()) {
      checkAndSetUsername(inputUsername.trim());
    } else {
      toast.error("Username cannot be empty.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setDropdownOpen(false);
    toast.info("Logged out successfully.");
    setTimeout(() => window.location.reload(), 1000);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white p-4 shadow-md">
        <div className="w-full mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold tracking-wide">🎬 VPT</h1>

          {!username ? (
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 text-sm rounded"
            >
              🔐 Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${username}&background=0D8ABC&color=fff`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <span className="hidden sm:inline-block text-sm">{username}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-zinc-900 text-white rounded-lg shadow-lg z-50 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded text-sm mt-2"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-black">
            <h2 className="text-lg font-semibold mb-4">Enter Your Username</h2>
            <input
              type="text"
              placeholder="Username"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 bg-blue-100 text-red-700 rounded hover:bg-blue-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
