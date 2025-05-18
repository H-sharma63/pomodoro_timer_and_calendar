import React, { useState } from 'react';
import { TaskBlock } from './TaskBlock';
import { useTasks, Task } from '../context/TaskContext';
import { PlusIcon, TrashIcon } from 'lucide-react';
const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
const COLORS = ['bg-gradient-to-r from-pink-600 to-purple-600', 'bg-gradient-to-r from-cyan-600 to-blue-600', 'bg-gradient-to-r from-purple-600 to-pink-600', 'bg-gradient-to-r from-blue-600 to-cyan-600', 'bg-gradient-to-r from-pink-600 to-cyan-600', 'bg-gradient-to-r from-purple-600 to-blue-600'];
export function WeeklyCalendar() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask
  } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('bg-gradient-to-r from-pink-600 to-purple-600');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent, day: string, time: string) => {
    e.preventDefault();
    if (draggedTask) {
      updateTask(draggedTask.id, {
        day,
        time
      });
      setDraggedTask(null);
    }
  };
  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        id: Date.now().toString(),
        title: newTaskTitle,
        day: 'mon',
        time: '09:00',
        color: selectedColor
      });
      setNewTaskTitle('');
    }
  };
  const handleDeleteTask = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedTask) {
      deleteTask(draggedTask.id);
      setDraggedTask(null);
    }
  };
  return <div className="bg-slate-800 rounded-lg shadow-[0_0_20px_rgba(15,23,42,0.3)] p-4 border border-pink-500">
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} placeholder="New task..." className="flex-1 bg-slate-900 border border-cyan-500 rounded p-2 text-cyan-300 placeholder-cyan-700 focus:outline-none focus:border-pink-500 transition-colors" />
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            {COLORS.map(color => <button key={color} onClick={() => setSelectedColor(color)} className={`w-6 h-6 rounded-full ${color} ${selectedColor === color ? 'ring-2 ring-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : ''}`} />)}
          </div>
          <button onClick={handleAddTask} className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded p-2 flex items-center shadow-[0_0_10px_rgba(236,72,153,0.3)] hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300">
            <PlusIcon size={16} className="mr-1" /> Add
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-1 mb-1">
            <div className="bg-slate-700 p-2 rounded font-bold text-center text-cyan-400">
              Time
            </div>
            {DAYS.map(day => <div key={day} className="bg-slate-700 p-2 rounded font-bold text-center capitalize text-cyan-400">
                {day}
              </div>)}
          </div>
          <div className="grid grid-cols-1 gap-1">
            {HOURS.map(hour => <div key={hour} className="grid grid-cols-8 gap-1 mb-1">
                <div className="bg-slate-900 p-2 rounded text-center text-sm font-medium text-cyan-500">
                  {hour}
                </div>
                {DAYS.map(day => <div key={`${day}-${hour}`} className="bg-slate-900 p-2 rounded min-h-[60px] border border-slate-700 hover:border-cyan-900 transition-colors" onDragOver={handleDragOver} onDrop={e => handleDrop(e, day, hour)}>
                    {tasks.filter(task => task.day === day && task.time === hour).map(task => <TaskBlock key={task.id} task={task} onDragStart={handleDragStart} />)}
                  </div>)}
              </div>)}
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 border-2 border-dashed border-red-500 rounded-lg text-center flex items-center justify-center bg-slate-900 hover:bg-red-900/20 transition-colors" onDragOver={handleDragOver} onDrop={handleDeleteTask}>
        <TrashIcon className="text-red-400 mr-2" size={20} />
        <span className="text-red-400">Drag here to delete</span>
      </div>
    </div>;
}