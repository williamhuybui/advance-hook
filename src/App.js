import "./App.css";
import React, {useState, useRef} from "react";

function convertToTime(s) {
  var hours = Math.floor(s / 3600);
  s %= 3600;
  var minutes = Math.floor(s / 60);
  var remainingSeconds = s % 60;

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (remainingSeconds < 10) remainingSeconds = "0" + remainingSeconds;

  return hours + ":" + minutes + ":" + remainingSeconds;
}

function App() {
  const [sec, setSec] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const setIntervalId = useRef(0);
  const timeDisplay = useRef(convertToTime(sec));
  
  
  const handleStart = () => {
    setIntervalId.current = setInterval(()=>{
      setSec((sec)=>sec+1)
    }, 1000);
    timeDisplay.current = convertToTime(sec);
    setIsActive(true);
  };
  
  const handleStop = () => {
    setIsActive(false);
    clearInterval(setIntervalId.current);
  };
  
  const handleReset = () => {
    setSec(0);
    timeDisplay.current = convertToTime(sec);
    clearInterval(setIntervalId.current);
  };

  return (
    <>
      <h1>Stop Watch</h1>
      <div ref={timeDisplay}></div>
      <div className="container">
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
}

export default App;
