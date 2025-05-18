import React from 'react';
import { Task } from '../context/TaskContext';
type TaskBlockProps = {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
};
export function TaskBlock({
  task,
  onDragStart
}: TaskBlockProps) {
  return <div draggable onDragStart={e => onDragStart(e, task)} className={`${task.color} p-2 mb-1 rounded shadow-sm cursor-move border border-white`}>
      <p className="text-xs font-bold truncate">{task.title}</p>
      <p className="text-xs opacity-75">{task.time}</p>
    </div>;
}