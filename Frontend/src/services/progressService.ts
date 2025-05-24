import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function getProgress(username: string, videoId: string) {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/progress/${username}/${videoId}`
    );
    
    if (response.data.data === null) {
      console.log("No progress found - new video for this user");
      return null;
    }
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch progress:", error);
    throw error;
  }
}


export async function saveProgress(
  username: string,
  videoId: string,
  lastWatchedPosition: number,
  watchedPercentage: number,
  completed: boolean,
  rewatched: boolean
) {
  try {
    const response = await axios.post(`${SERVER_URL}/api/progress`, {
      username,
      videoId,
      lastWatchedPosition,
      watchedPercentage,
      completed,
      rewatched,
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to save progress:", error);
    throw error;
  }
}
