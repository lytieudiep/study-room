"use client";

// src/components/Pomodoro.tsx
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStop,
  faRedo,
  faCog,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";


function classNames(...classes: string[]) {
  return classes.join(" ")
}

const Pomodoro: React.FC = () => {
  const [focusTime, setFocusTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);
  const [minutes, setMinutes] = useState<number>(focusTime);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const startSoundRef = useRef<HTMLAudioElement>(null);
  <audio ref={startSoundRef} src="/start-sound.mp3" />


  useEffect(() => {
    setMinutes(focusTime);
    setSeconds(0);
  }, [focusTime, breakTime]);

  useEffect(() => {
    if (isRunning) {
      const timerInterval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(timerInterval);
          setIsRunning(false);
        } else if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [isRunning, minutes, seconds]);

  const startTimer = () => {
    startSoundRef.current?.play();
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(focusTime);
    setSeconds(0);
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);


  return (
    <div className="flex-col items-center">
      <div className="">
        <h1 className="card-title text-sm font-medium ">Timer</h1>
      </div>
      <div className="flex items-center mt-4"> {/* Wrap the timer and buttons in a flex container */}
        <div className="text-6xl font-bold">
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>
        <div className="flex ml-4"> {/* Wrap the buttons in a flex container */}
          <button
            className="btn btn-sm btn-primary" aria-label="Start"
            onClick={startTimer}
            disabled={isRunning}
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className="btn btn-sm btn-error mx-4 " aria-label="Stop" onClick={stopTimer}>
            <FontAwesomeIcon icon={faStop} />
          </button>
          <button className="btn btn-sm btn-danger" aria-label="Reset"onClick={resetTimer}>
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
      </div>

      <div className="collapse collapse-arrow">
      <input type="checkbox" aria-label="open setting"/>
        <div className="collapse-title text-xs font-bold ">
        Pomodoro Settings
        </div>
        <div className="collapse-content">
          <div className="space-y-2">
            <div className="flex">
              <label className="text-md">Focus Time (minutes):</label>
              <input
                type="number"
                value={focusTime}
                onChange={(e) => setFocusTime(parseInt(e.target.value))}
                className="input input-primary ml-2 w-1/2"
              />
            </div>
            <div className="flex">
              <label className="text-md">Break Time (minutes):</label>
              <input
                type="number"
                value={breakTime}
                onChange={(e) => setBreakTime(parseInt(e.target.value))}
                className="input input-primary ml-2 w-1/2"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
