import React, { useEffect, useState } from "react";

const Timer = ({ sendDatatoParent }) => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        sendDatatoParent(seconds);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        marginTop: "10px",
        marginRight: "20px",
        backgroundColor: "black",
        borderRadius: "20px",
        padding: "15px",
      }}
    >
      <h1 style={{ fontSize: "62px", color: "white" }}>
        {seconds} seconds left
      </h1>
      <button
        className="btn btn-warning"
        onClick={() => {
          setSeconds(30);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Timer;
