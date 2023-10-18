import React, { useEffect, useState } from "react";

const Timezone = (props) => {
  const hours = new Date(props.countryTime).getHours();
  const minutes = new Date(props.countryTime).getMinutes();
  const seconds = new Date(props.countryTime).getSeconds();

  const timeInSeconds = hours * 60 * 60 + minutes * 60 + seconds;
  const [remainingTimeInSec, setRemainingTimeInSec] = useState(timeInSeconds);
  const [isPaused, setIsPaused] = useState(false);

  console.log(props);

  console.log(timeInSeconds);
  const stop = ()=>{
    setIsPaused(true)
  }
  const start = ()=>{
    setIsPaused(false)
  }
  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setRemainingTimeInSec((prev) => {
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused]);

  return (
    <div className="text-xl font-bold text-center flex items-center">
      <span className="w-[140px] mx-4 bg-black text-white p-2">
      {Math.floor(remainingTimeInSec / 3600)} :{" "}
      {Math.floor((remainingTimeInSec % 3600) / 60)} :{remainingTimeInSec % 60}
      </span>
      {!isPaused && <button className="border border-gray-700 rounded-lg p-2" onClick={stop}>Stop</button>}
      
      {isPaused && <button className="border border-gray-700 rounded-lg p-2" onClick={start}>Start</button>}
    </div>
  );
};

export default Timezone;

