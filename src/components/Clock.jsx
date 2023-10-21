import { useEffect, useState } from "react";

const Clock = (props) => {
  const { countryTime, rawOffset } = props;
  const [localTime, setLocalTime] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const convertToTimeString = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours} : ${minutes} : ${seconds}`;
  };

useEffect(() => {
  const initialTimeInSeconds =
    new Date(countryTime).getHours() * 3600 +
    new Date(countryTime).getMinutes() * 60 +
    new Date(countryTime).getSeconds() -
    parseInt(rawOffset, 10);

  setLocalTime(initialTimeInSeconds);

  let intervalId;

  if (!isPaused) {
    intervalId = setInterval(() => {
      setLocalTime((prev) => prev + 1);
    }, 1000);
  }

  return () => {
    clearInterval(intervalId);
  };
}, [countryTime, rawOffset, isPaused]);


  const stop = () => {
    setIsPaused(true);
  };

  const start = () => {
    setIsPaused(false);
  };

  return (
    <div className="flex items-end justify-between text-xl font-bold text-center md:flex md:items-center">
      <span className="w-[200px] md:mx-4 border rounded-lg bg-black text-white p-2">
        TIME: {convertToTimeString(localTime)}
      </span>
      {!isPaused && (
        <button
          className=" w-[80px] border border-gray-700 rounded-lg p-2 bg-blue-200 hover:bg-blue-400"
          onClick={stop}
        >
          Stop
        </button>
      )}
      {isPaused && (
        <button
          className="w-[80px] border border-gray-700 rounded-lg p-2 bg-blue-200 hover:bg-blue-400"
          onClick={start}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default Clock;
