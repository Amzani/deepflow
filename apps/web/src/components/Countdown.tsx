import React, { useState, useEffect } from 'react';
// import sound from '@/assets/Funky-guitar-logo.mp3';
import useSound from 'use-sound';
// See https://codesandbox.io/s/reactplaysound-p47gk?file=/src/index.js:61-104
interface CountdownProps {
  seconds: number;
  start: boolean
}

const Countdown: React.FC<CountdownProps> = ({ seconds, start }) => {
  const [count, setCount] = useState(seconds);
  const [playSound] = useSound('/Funky-guitar-logo.mp3');

  useEffect(() => {
    if (count > 0 && start) {
      const timer = setInterval(() => {
        document.title = `${formatTime(count - 1)} focusing`;
        setCount(prevCount => prevCount - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else if (count == 0) {
      console.log("Finish")
      playSound()
    }
  }, [count, start, playSound]);

  useEffect(() => {

  }, [seconds])


  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return formattedHours !== '00' ? 
      `${formattedHours}:${formattedMinutes}:${formattedSeconds}`:
      `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      {count > 0 ? (
        <div className='ordinal slashed-zero tabular-nums text-center'>
          {formatTime(count)}
        </div>
      ) : (
        <><h1>Countdown Finished!</h1></>
      )}
    </div>
  );
};

export default Countdown;
