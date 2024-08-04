import React, { useState, useEffect } from "react";
import "./MoodTracker.css";

const MoodTracker = () => {
  const [moodLog, setMoodLog] = useState([]);
  const [comment, setComment] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    const savedMoodLog = JSON.parse(localStorage.getItem("moodLog"));
    if (savedMoodLog) {
      setMoodLog(savedMoodLog);
    }
  }, []);

  const handleMoodClick = (mood) => {
    const newMood = { mood, date: formatDate(new Date()), comment: "" };
    const updatedMoodLog = [newMood, ...moodLog];
    setMoodLog(updatedMoodLog);
    localStorage.setItem("moodLog", JSON.stringify(updatedMoodLog));
    setSelectedMood(null); // Clear the selection
  };

  const handleLogMood = () => {
    if (comment.trim()) {
      const newMood = {
        mood: "📝",
        date: formatDate(new Date()),
        comment,
      };
      const updatedMoodLog = [newMood, ...moodLog];
      setMoodLog(updatedMoodLog);
      localStorage.setItem("moodLog", JSON.stringify(updatedMoodLog));
      setComment("");
    }
  };

  const formatDate = (date) => {
    return date.toLocaleString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mood-tracker">
      <h2>How are you feeling?</h2>
      <div className="mood-options">
        {["😊", "😭", "😡", "😔", "😴"].map((emoji, index) => (
          <button
            key={index}
            onClick={() => handleMoodClick(emoji)}
            className={`mood-button ${
              selectedMood === emoji ? "selected" : ""
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className="mood-input">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write how you are feeling..."
          className="mood-comment"
        />
        <button onClick={handleLogMood} className="log-mood-button">
          Log Mood
        </button>
      </div>
      <div className="mood-log">
        {moodLog.map((entry, index) => (
          <div key={index} className="mood-log-entry">
            <p>
              {entry.date} - {entry.mood}
            </p>
            {entry.comment && (
              <p>
                <br></br>
                {entry.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
