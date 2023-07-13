"use client";

import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import Countdown from '@/components/Countdown'
import { useState } from 'react'
import Button from '@/components/Button'
import { Metadata } from 'next'


export default function Home() {
  const [isFocused, setIsFocused] = useState(true)
  const [isBreak, setIsBreak] = useState(false)
  const isFocusedStyle = isFocused ? "text-black bg-white font-extrabold" : "text-white border-2"
  const setIsBreakStyle = isBreak ? "text-black bg-white font-extrabold" : "text-white border-2"
  const [selectedDuration, setSelectedDuration] = useState(1500)
  const [task, setTask] = useState('')
  const [start, setStart] = useState(false)
  const durations = [
    {
      label: "10s",
      value: 10,
    },
    {
      label: "5 min",
      value: 300,
    },
    {
      label: "10 min",
      value: 600,
    },
    {
      label: "15 min",
      value: 900,
    },
    {
      label: "25 min",
      value: 1500,
    },
    {
      label: "30 min",
      value: 1800,
    },
    {
      label: "45 min",
      value: 2700,
    },
    {
      label: "60 min",
      value: 3600,
    },
  ];
  

  const handleFocus = (e: { preventDefault: () => void; }) => {
    setIsFocused(true)
    setIsBreak(false)
    e.preventDefault();
  }

  const handleBreak = (e: { preventDefault: () => void; }) => {
    setIsFocused(false)
    setIsBreak(true)
    e.preventDefault();
  }

  const handleDuration = (e: {
    target: any; preventDefault: () => void; 
}) => {
    console.log(e.target.value, Number(e.target.value))
    setSelectedDuration(Number(e.target.value))
    setIsBreak(isBreak)
    setIsFocused(isFocused)
    setStart(false)
    e.preventDefault();
  }

  const toggleStart = (e: {
    target: any; preventDefault: () => void; 
}) => {
    setStart(!start);
    try {
      const wsClient = new WebSocket("ws://localhost:3002")
      wsClient.onopen = () => {
        console.log("connected to websocket", start)
        wsClient.send(JSON.stringify({
          eventId: uuidv4(),
          status: start ? "available" : "busy",
          duration: selectedDuration,
          availableIn : !start ? (Date.now() + selectedDuration*1000) : null,
          message: task,
          username: "samir"
        }))
      }
    } catch(err) {
      console.log(err)
    }
    e.preventDefault();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-3xl">Deepflow</p>
            {/* <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            /> */}
          </a>
        </div>
      </div>

      <div className="text-stone-950 font-mono">
        <div>
        <form className='mb-10 flex justify-between'>
          <button className={`${isFocusedStyle} rounded-md  w-1/3 text-3xl py-3`} onClick={handleFocus}>
            Focus
          </button>
          <button className={`${setIsBreakStyle} rounded-md w-1/3 text-3xl py-3`} onClick={handleBreak}>
            Break
          </button>
        </form>
        <form>
          <label className="block text-white">
              <div className="text-xl mb-5">Set your objective</div>
              <textarea
                className="rounded-md text-black form-textarea mt-1 block w-full h-24 mb-7"
                value={task}
                rows={3}
                cols={50}
                placeholder="Enter some long form content."
                onChange={(e) => setTask(e.target.value)}
              ></textarea>
          </label>
        </form>
        <form>
          <label className="block text-white">
              <div className="text-xl mb-5">Set your duration</div>
              <select className="text-black form-select block w-full mt-1" value={selectedDuration} onChange={handleDuration}>
                { durations.map((duration) => (<option key={duration.value} value={duration.value}>{duration.label}</option>)) }
              </select>
          </label>
        </form>
        
        <div className='text-white mt-10 text-9xl tracking-tight'>
          <Countdown key={selectedDuration} seconds={selectedDuration} start={start} />
        </div>
        <div className='flex w-full justify-center mt-7'>
          <button className="rounded-md text-black w-40 text-4xl bg-slate-300 py-4" onClick={toggleStart}>
            {start ? 'Pause' : 'Start'}
          </button>
        </div>
        </div>
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
      </div>
    </main>
  )
}
