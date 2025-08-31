import React, { useState, useEffect } from "react";
import "./App.css";

import pfp from "./pfp.png";
import view from "./images/viewW.svg";
import insta from "./images/insta.png";
import yt from "./images/yt.png";
import discord from "./images/discord.png";
import git from "./images/git2.png";

import bg from "./videos/bg.mp4";
import bgSound from "./song/wokeup.mp3";



function App() {
  const [viewCount, setViewCount] = useState(3242);
  const [bio, setBio] = useState("");
  const [entered] = useState(true);

  const [bioText] = useState("I code in C++/C");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTyping) {
        if (index < bioText.length) {
          setBio((prevBio) => prevBio + bioText.charAt(index));
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsTyping(false);
        }
      } else {
        if (index >= 0) {
          setBio((prevBio) => prevBio.slice(0, index));
          setIndex((prevIndex) => prevIndex - 1);
        } else {
          setIsTyping(true);
        }
      }
    }, 50);

    return () => clearInterval(timer);
  }, [bioText, index, isTyping]);

  useEffect(() => {
    fetch("/increment-view")
      .then((response) => response.json())
      .then((data) => setViewCount(data.viewCount))
      .catch((error) => console.error("Error fetching view count:", error));
  }, []);

  useEffect(() => {
    const disableContext = (e) => e.preventDefault();
    const disableKeys = (e) => {
      if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) 
        (e.ctrlKey && e.keyCode === 85) 
      ) {
        e.preventDefault();
        document.body.innerHTML =
          "<h1 style='color:red;text-align:center;margin-top:20%'>Unavailable 🚫</h1>";
      }
    };

    const blockDevTools = () => {
      const element = new Image();
      Object.defineProperty(element, "id", {
        get: function () {
          document.body.innerHTML =
            "<h1 style='color:red;text-align:center;margin-top:20%'>Unavailable 🚫</h1>";
          throw new Error("DevTools Blocked");
        },
      });
      console.log(element);
    };

    document.addEventListener("contextmenu", disableContext);
    document.addEventListener("keydown", disableKeys);

    const interval = setInterval(() => {
      blockDevTools();
      (function () {
        function loop() {
          try {
            (function () {}.constructor("debugger")());
          } catch (e) {}
          setTimeout(loop, 200);
        }
        loop();
      })();
    }, 1000);

    return () => {
      document.removeEventListener("contextmenu", disableContext);
      document.removeEventListener("keydown", disableKeys);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="app-container">
      <video autoPlay loop muted className="video-background">
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio autoPlay hidden loop controls>
        <source src={bgSound} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className={`main-container ${entered ? "entered" : ""}`}>
        <div className="views-container">
        </div>

        <img src={pfp} className="pfp" alt="Profile Picture" />

        <div className="info">
          <h1 className="name">Lucas</h1>
          <h1 className="bio">{bio}</h1>
        </div>

        <div className="links">
          <a
            href="https://github.com/lucasisud"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={git} className="link2" alt="GitHub" />
          </a>
      
          <a
            href="https://www.youtube.com/lucasisud"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={yt} className="link4" alt="YouTube" />
          </a>
          <a
            href="https://discord.com/users/1167824650491920424"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={discord} className="link5" alt="Discord" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
