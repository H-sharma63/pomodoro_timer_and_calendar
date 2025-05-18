import React, { useState } from 'react';
import { PomodoroTimer } from './components/PomodoroTimer';
import { WeeklyCalendar } from './components/WeeklyCalendar';
import { TaskProvider } from './context/TaskContext';
export function App() {
  const [activeTab, setActiveTab] = useState('timer');
  return <TaskProvider>
      <div className="min-h-screen bg-slate-900 text-cyan-300 font-mono">
        <header className="bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 p-4 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 tracking-wider">
            Pomodoro Timer & Weekly Calendar
          </h1>
        </header>
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex justify-center gap-4 mb-6">
            <button onClick={() => setActiveTab('timer')} className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${activeTab === 'timer' ? 'bg-pink-600 border-pink-400 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-transparent border-cyan-500 text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]'}`}>
              Timer
            </button>
            <button onClick={() => setActiveTab('calendar')} className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${activeTab === 'calendar' ? 'bg-pink-600 border-pink-400 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-transparent border-cyan-500 text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]'}`}>
              Calendar
            </button>
          </div>
          {activeTab === 'timer' ? <PomodoroTimer /> : <WeeklyCalendar />}
        </div>
      </div>
    </TaskProvider>;
}