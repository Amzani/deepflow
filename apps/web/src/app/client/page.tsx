"use client";

import { FC, useEffect, useState } from 'react'

interface clientProps {
  
}

type Flow = {
  eventId: string,
  status: string,
  duration: number,
  availableIn: number,
  message: string,
  username: string
}

const Client: FC<clientProps> = ({}) => {
  const [flow, setFlow] = useState<null|Flow>(null);
  const wsClient = new WebSocket("ws://localhost:3002")

  useEffect(() => {
    wsClient.onopen = () => {
      console.log("connected to websocket")
    }
    wsClient.onmessage = (e) => {
      console.log(e);
      let data
      try {
        data = JSON.parse(e.data)
      } catch(err) {
        data = null
      }
      
      setFlow(data);
    }

    return () => {
      wsClient.close()
    }
  }, [])

  return (
    <div>
      { flow && flow?.status === "available" &&
        <div className='flex items-center gap-x-3'>
        <div className="text-green-500 bg-green-800/10 flex-none rounded-full p-1">
          <div className="h-4 w-4 rounded-full bg-current"></div>
        </div>
        <h2 className="flex gap-x-2 min-w-0 text-sm font-semibold leading-1 text-white">
          {flow?.username} is available
        </h2>
      </div>
      }
      { flow && flow?.status === "busy" &&
        <div className='flex items-center gap-x-3'>
        <div className="text-red-500 bg-green-800/10 flex-none rounded-full p-1">
          <div className="h-4 w-4 rounded-full bg-current"></div>
        </div>
        <h2 className="flex gap-x-2 min-w-0 text-sm font-semibold leading-1 text-white">
          {flow?.username} is busy
        </h2>
      </div>
      }
      { !flow &&
        <div className='flex items-center gap-x-3'>
          <div className="text-green-500 bg-green-800/10 flex-none rounded-full p-1">
            <div className="h-4 w-4 rounded-full bg-current"></div>
          </div>
          <h2 className="flex gap-x-2 min-w-0 text-sm font-semibold leading-1 text-white">
            samir is available
          </h2>
        </div>
        
      }
      
    </div>
  )
}

export default Client