import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Image1 from "./images/OF_Logo.png";
import Image2 from "./images/Final Profile.jpg";

function App() {
  const [timeLeft, setTimeLeft] = useState(600);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Location fetch function
  const fetchLocationData = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setLocation(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching location:', error);
      setLoading(false);
    }
  };

  // Add useEffect for location fetching
  useEffect(() => {
    fetchLocationData();
  }, []);

  // Your existing useEffects for timer and clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev === 0 ? 600 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}s`;
  };

  const formatClock = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  return (
    <div className="profile-container">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="profile-content">
        <div className="profile-image">
          <img src={Image2} alt="Profile" className="avatar" />
        </div>
        <h1 className="name">Lady Nattasha🖤</h1>
        <p className="bio"> 🟢Available now  | ⏰I respond in 2 minutes.</p>
        
        {/* Add location display */}
        {location && (
          <p className="bio">
            📍 {location.city}, {location.country_name}
          </p>
        )}
        
        <p className="bio">
          Say hello to ur new favorite mistress, R u ready for what's coming😈?
        </p>
     
        <a href="https://onlyfans.com/ladynattasha/c1">
          <button className="message-button">
            <img className="emo" src={Image1} alt="Logo" />Message Me Here
          </button>
        </a>
        <p className="offer">
          Free trial offer ends in {formatTime(timeLeft)}
        </p>
        <br></br>
        <a href="https://t.me/+Tkje7rfQohtiYjYx">
          <button className="message-button2">
            Become one of my loyal slaves😈
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;

