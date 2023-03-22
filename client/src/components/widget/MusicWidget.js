import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Widget.css";

const MusicWidget = ({ id, title, videoId, onVideoIdChange, onSave, Time }) => {
  const [videoIdInput, setVideoIdInput] = useState(videoId || "");
  const [videoName, setVideoName] = useState("");
  const [viewCount, setViewCount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(Time || 5); // default interval is 5 minutes

  useEffect(() => {
    fetchData();
  }, [videoIdInput]);

  useEffect(() => {
    const intervalId = setInterval(fetchData, refreshInterval * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoIdInput}&list&part=snippet,statistics&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      const data = response.data.items[0];
      setVideoName(data.snippet.title);
      setViewCount(data.statistics.viewCount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoIdInputChange = (event) => {
    setVideoIdInput(event.target.value);
  };

  const handleValidateClick = () => {
    setEditMode(false);
    onVideoIdChange?.(videoIdInput);
    fetchData();
    onSave?.(id, "music", videoIdInput, null, refreshInterval);
  };

  const handleRefreshIntervalChange = (event) => {
    setRefreshInterval(parseInt(event.target.value));
  };

  return (
    <div className="widget music-widget" key={id}>
      {!editMode && (
        <div className="music-info">
          <div>
            <h3>{videoName || title}</h3>
            {videoName && <h4>{viewCount} views</h4>}
          </div>
        </div>
      )}
      <div className="widget-title">Widget Youtube</div>
      {editMode ? (
        <div>
          <label>
            Video ID:
            <input
              type="text"
              value={videoIdInput}
              onChange={handleVideoIdInputChange}
            />
          </label>
          <br />
          <label>
            Refresh interval (minutes):
            <input
              type="number"
              value={refreshInterval}
              onChange={handleRefreshIntervalChange}
            />
          </label>
          <br />
          <button onClick={handleValidateClick} className="edit-button">
            Validate
          </button>
        </div>
      ) : (
        <div className="edit-button-container">
          <button onClick={() => setEditMode(true)} className="edit-button">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default MusicWidget;
