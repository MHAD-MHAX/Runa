import React, { useState, useEffect } from "react";
import "./App.css";

import { Link } from "react-router-dom";

import Image1 from "./images/OF_Logo.png";
import Image2 from "./images/Final Profile.jpg";

function App() {
  const [timeLeft, setTimeLeft] = useState(600); // Initial countdown time: 10 minutes
  const [currentTime, setCurrentTime] = useState(new Date()); // To store the current time
  const [location, setLocation] = useState("Fetching location..."); // To store the user's location

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev === 0 ? 600 : prev - 1)); // Reset to 10 minutes when 0
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  // Dynamic clock
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval); // Cleanup clock on unmount
  }, []);

  // Fetch user location based on IP
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("http://ip-api.com/json/");
        const data = await response.json();

        if (data.status === "success") {
          setLocation(`${data.city} ${data.country}`);
        } else {
          setLocation("Unable to retrieve location details.");
        }
      } catch (error) {
        setLocation("Error fetching location data.");
      }
    };

    fetchLocation();
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
        <p className="location">📍 {location}</p> {/* Display location */}
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