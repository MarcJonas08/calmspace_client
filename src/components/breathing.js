import React, { useEffect, useRef, useState } from 'react';
import '../css/BreathingExercise.css';

function BreathingExercise() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const pointerRef = useRef(null);

  const totalTime = 7500;
  const breatheTime = (totalTime / 5) * 2;
  const holdTime = totalTime / 5;

  const [isRunning, setIsRunning] = useState(false);
  const timeoutRefs = useRef([]);

  const breathAnimation = () => {
    textRef.current.innerText = 'Breathe In!';
    containerRef.current.className = 'container grow';
    pointerRef.current.className = 'pointer-container rotate';

    timeoutRefs.current.push(
      setTimeout(() => {
        textRef.current.innerText = 'Hold';

        timeoutRefs.current.push(
          setTimeout(() => {
            textRef.current.innerText = 'Breathe Out!';
            containerRef.current.className = 'container shrink';
          }, holdTime)
        );
      }, breatheTime)
    );
  };

  const startBreathAnimation = () => {
    breathAnimation(); // Initial animation
    const breathInterval = setInterval(breathAnimation, totalTime);
    return breathInterval;
  };

  const stopBreathAnimation = () => {
    setIsRunning(false);
    // Clear timeouts when stopping the animation
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];

    // Reset classes when stopping the animation
    containerRef.current.className = 'container';
    pointerRef.current.className = 'pointer-container';
  };

  useEffect(() => {
    let breathInterval;

    if (isRunning) {
      breathInterval = startBreathAnimation();
    }

    return () => {
      clearInterval(breathInterval);
    };
  }, [isRunning]);

  const handleStartClick = () => {
    setIsRunning(true);
  };

  return (
    <div className="breathing-app">
      <h1>Breathing Exercise</h1>
      <div className='btns'>
        <button onClick={handleStartClick} disabled={isRunning} className='rlx-btn'>
          Start
        </button>
        <button onClick={stopBreathAnimation} disabled={!isRunning} className='rlx-btn'>
          Stop
        </button>
      </div>

      <div className="container" ref={containerRef}>
        <div className="circle"></div>
        <p ref={textRef}></p>
        <div className="pointer-container" ref={pointerRef}>
          <span className="pointer"></span>
        </div>
        <div className="gradient-circle"></div>
      </div>
    </div>
  );
}

export default BreathingExercise;
