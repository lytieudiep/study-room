"use client"; 

import { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;

    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (!isRunning && intervalId) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(25 * 60);
    setIsRunning(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="text-center">
        <div className="text-4xl font-bold mb-4">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className="flex justify-center gap-4">
          <button
            className="btn btn-primary"
            onClick={startTimer}
            disabled={isRunning || timeRemaining === 0}
          >
            Start
          </button>
          <button className="btn btn-secondary" onClick={stopTimer} disabled={!isRunning}>
            Stop
          </button>
          <button className="btn btn-secondary" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
