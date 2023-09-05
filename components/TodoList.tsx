"use client"; 

// components/ToDoList.tsx

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



const ToDoList = () => {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [listContainerHeight, setListContainerHeight] = useState<string>('auto');

  useEffect(() => {
    // Set a maximum height for the list container when tasks exceed a certain number
    const maxTasksToShow = 3; // Adjust this number as needed
    if (tasks.length > maxTasksToShow) {
      setListContainerHeight('300px'); // Set the desired maximum height in pixels
    } else {
      setListContainerHeight('auto');
    }
  }, [tasks]);


  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="p-2">
      <div className="flex">
        <input
          type="text"
          className="input w-full "
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-primary"
                checked={task.completed}
                onChange={() => toggleCompletion(index)}
              />
              <span
                className={task.completed ? 'line-through text-gray-400 ml-2' : 'ml-2'}
              >
                {task.text}
              </span>
            </label>
            <button
              className="btn btn-outline btn-square btn-danger"
              onClick={() => removeTask(index)}
            >
              <FontAwesomeIcon icon={faTimes} />

            </button>
          </div>
        ))}
      </div>
  
      <div className="mt-4">
        <div className="progress-bar bg-primary w-full">
          <div
            className="progress-bar-fill bg-success"
            style={{
              width: `${(tasks.filter((task) => task.completed).length /
                tasks.length) *
                100}%`,
            }}
          ></div>
        </div>
        <p className="text-sm mt-2">
          {tasks.filter((task) => task.completed).length} of {tasks.length} tasks completed
        </p>
      </div>
    </div>
  );
};

export default ToDoList;
