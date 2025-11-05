'use client';

import { useEffect, useState } from 'react';

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
      <div className="text-5xl font-bold">
        {currentTime.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        })}
      </div>
    </div>
  );
}
