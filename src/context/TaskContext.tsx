import React, { useState, createContext, useContext } from 'react';
export type Task = {
  id: string;
  title: string;
  day: string;
  time: string;
  color: string;
};
type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
};
const TaskContext = createContext<TaskContextType | undefined>(undefined);
export function TaskProvider({
  children
}: {
  children: ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([{
    id: '1',
    title: 'Study Math',
    day: 'mon',
    time: '09:00',
    color: 'bg-gradient-to-r from-pink-600 to-purple-600'
  }, {
    id: '2',
    title: 'Read Manga',
    day: 'tue',
    time: '14:00',
    color: 'bg-gradient-to-r from-purple-600 to-pink-600'
  }, {
    id: '3',
    title: 'Practice Drawing',
    day: 'wed',
    time: '16:00',
    color: 'bg-gradient-to-r from-cyan-600 to-blue-600'
  }, {
    id: '4',
    title: 'Watch Anime',
    day: 'fri',
    time: '19:00',
    color: 'bg-gradient-to-r from-pink-600 to-cyan-600'
  }]);
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? {
      ...task,
      ...updatedTask
    } : task));
  };
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  return <TaskContext.Provider value={{
    tasks,
    addTask,
    updateTask,
    deleteTask
  }}>
      {children}
    </TaskContext.Provider>;
}
export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
