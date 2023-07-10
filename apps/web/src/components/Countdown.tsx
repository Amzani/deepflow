import React, { useState, useEffect } from 'react';

interface CountdownProps {
  seconds: number;
  start: boolean
}

const Countdown: React.FC<CountdownProps> = ({ seconds, start }) => {
  const [count, setCount] = useState(seconds);


  useEffect(() => {
    if (count > 0 && start) {
      const timer = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [count, start]);

  useEffect(() => {

  }, [seconds])


  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      {count > 0 ? (
        <div className='ordinal slashed-zero tabular-nums'>{formatTime(count)}</div>
      ) : (
        <h1>Countdown Finished!</h1>
      )}
    </div>
  );
};

export default Countdown;
