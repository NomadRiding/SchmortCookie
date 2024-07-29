import React, { useState, useEffect } from 'react';
import './CountDown.css';

const warningThreshold = 10;
const alertThreshold = 5;
const FULL_DASH_ARRAY = 283; // Full length of the circle perimeter

const colorCode = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: warningThreshold
  },
  alert: {
    color: "red", // Fixed typo: changed "color" to a valid color
    threshold: alertThreshold
  }
};

const timeLimit = 25;

const TimerComponent = () => {
  const [timePassed, setTimePassed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [remainingPathColor, setRemainingPathColor] = useState(colorCode.info.color);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => {
        updateTime();
      }, 1000);
      return () => clearInterval(timerInterval); // Clean up interval on component unmount 
    }
  }, [timeLeft]);

  const updateTime = () => {
    setTimePassed(prev => {
      const newTimePassed = prev + 1;
      if (newTimePassed <= timeLimit) {
        const newTimeLeft = timeLimit - newTimePassed;
        setTimeLeft(newTimeLeft);
        updateRemainingPathColor(newTimeLeft);
      }
      return newTimePassed;
    });
  };

  const updateRemainingPathColor = (timeLeft) => {
    if (timeLeft <= colorCode.alert.threshold) {
      setRemainingPathColor(colorCode.alert.color);
    } else if (timeLeft <= colorCode.warning.threshold) {
      setRemainingPathColor(colorCode.warning.color);
    } else {
      setRemainingPathColor(colorCode.info.color);
    }
  };

  const calculateStrokeDasharray = () => {
    const rawTimeFraction = timeLeft / timeLimit;
    const adjustedTimeFraction = rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
    return `${(adjustedTimeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
  };

  return (
    <div className='base-timer'>
      <svg className='base-timer__svg' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
        <g className='base-timer__circle'>
          <circle className='base-timer__path-elapse' cx='50' cy='50' r='45'></circle>
          <path
            id='base-timer-path-remaining'
            strokeDasharray={calculateStrokeDasharray()}
            className={`base-timer__path-remaining ${remainingPathColor}`}
            d='M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0'
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" className='base-timer__label'>
        {timeLeft}
      </span>
    </div>
  );
};

export default TimerComponent;