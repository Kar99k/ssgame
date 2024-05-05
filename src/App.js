import "./App.css";
import { motion, useAnimation } from "framer-motion";
import shadow from "./assets/Asset_5.png";
import cactus from "./assets/Asset_4.png";
import crosshair from "./assets/Asset_3.png";
import title from "./assets/Title.png";
import { useEffect, useRef, useState } from "react";
import Timer from "./Timer";

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();
  const [seconds, setSeconds] = useState(null);
  const [transX, setTransX] = useState(null);

  const cactusRef = useRef(null);

  function handleSeconds(data) {
    setSeconds(data);
  }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    if (isAnimating) {
      controls.stop();
    } else {
      controls.start({
        x: [-1000, 1000, -1000],
        transition: { duration: 5, ease: "easeInOut", repeat: Infinity },
      });
    }
  };

  useEffect(() => {
    if (seconds === 1) {
      controls.stop();
    } else if (seconds === 30) {
      controls.start({
        x: [-1000, 1000, -1000],
        transition: { duration: 5, ease: "easeInOut", repeat: Infinity },
      });
    }

    if (cactusRef.current) {
      const transformStyle = cactusRef.current.style.transform;
      if (transformStyle) {
        const match = transformStyle.match(/translateX\(([^)]+)\)/);
        if (match) {
          const translateXValue = parseFloat(match[1]);
          console.log("translateX:", translateXValue);
          setTransX(translateXValue);
        }
      }
    }
  }, [seconds]);

  return (
    <div className="App">
      <img
        src={title}
        alt=""
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          marginTop: "-200px",
          marginLeft: "-100px",
        }}
      />
      <Timer sendDatatoParent={handleSeconds} />
      <div className="cactusShadow">
        <img className="shadowimg" src={shadow} alt="" />
        <motion.img
          className="cactus"
          src={cactus}
          ref={cactusRef}
          alt=""
          animate={controls}
          initial={{ x: -1000 }}
          onAnimationComplete={() => {
            if (!isAnimating) controls.stop();
          }}
        />
        <img className="crosshair" src={crosshair} alt="" />
      </div>

      <button
        onClick={toggleAnimation}
        className="btn btn-success button"
        style={seconds === 1 ? { display: "none" } : {}}
      >
        {isAnimating ? "Capture" : "Start Again"}
      </button>
    </div>
  );
}

export default App;
