import React, { useEffect, useState } from 'react';
import { PlayIcon, PauseIcon, RefreshCwIcon } from 'lucide-react';
type TimerMode = 'work' | 'break';
export function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('work');
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval as NodeJS.Timeout);
            // Switch modes
            if (mode === 'work') {
              setCompletedPomodoros(prev => prev + 1);
              setMode('break');
              return 5 * 60; // 5 minute break
            } else {
              setMode('work');
              return 25 * 60; // 25 minute work session
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode]);
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setTime(25 * 60);
  };
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return <div className="flex flex-col items-center">
      <div className="relative mb-8 w-64 h-64 rounded-full bg-gradient-to-br from-pink-600 via-purple-600 to-cyan-600 p-1 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
        <div className="absolute inset-1 rounded-full bg-slate-900 flex items-center justify-center border border-pink-500">
          <div className="text-center">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400">
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-lg mt-2 text-pink-400 uppercase tracking-wider">
              {mode === 'work' ? 'Focus Time' : 'Break Time'}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-8">
        <button onClick={toggleTimer} className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-3 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_20px_rgba(236,72,153,0.7)] transition-all duration-300">
          {isActive ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
        </button>
        <button onClick={resetTimer} className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-3 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] transition-all duration-300">
          <RefreshCwIcon size={24} />
        </button>
      </div>
      <div className="bg-slate-800 p-4 rounded-lg shadow-[0_0_20px_rgba(15,23,42,0.3)] border border-pink-500 w-full max-w-sm">
        <h3 className="text-center font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
          Session Stats
        </h3>
        <p className="text-center text-cyan-300">
          Completed Pomodoros: {completedPomodoros}
        </p>
        <div className="flex justify-center gap-2 mt-3">
          {[...Array(4)].map((_, i) => <div key={i} className={`w-5 h-5 rounded-full ${i < completedPomodoros % 4 ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-slate-700 border border-slate-600'}`}></div>)}
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-cyan-400 max-w-xs opacity-80">
        <p>
          Work for 25 minutes, then take a 5-minute break. After 4 pomodoros,
          take a longer break!
        </p>
      </div>
    </div>;
}