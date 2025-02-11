// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MoodTrackerPage from "./pages/MoodTrackerPage";
import ResourcesPage from "./pages/ResourcesPage";
import ChatSupportPage from "./pages/ChatSupportPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mood-tracker" element={<MoodTrackerPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/chat-support" element={<ChatSupportPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
