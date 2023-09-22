"use client";

// components/ToDoList.tsx

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from '@prisma/client';

interface ToDoListProps {
  roomId: string
}

const ToDoList = ({ roomId }: ToDoListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [listContainerHeight, setListContainerHeight] = useState<string>('auto');
  const [isLoaded, setIsLoaded] = useState(false);


  const handleGetTasks = async () => {
    let resp = await fetch(
      `/api/rooms/${roomId}/tasks`,
      {
        method: "GET"
      }
    );
    if (resp.status == 200) {
      let respJson: { data: Task[] } = await resp.json();
      setTasks(respJson.data);
    }
  }

  const handleAddTask = async (taskDescription: string) => {
    let resp = await fetch(
      `/api/rooms/${roomId}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          taskDescription
        })
      }
    );

  }

  const handleDeleteTask = async (taskId: string) => {

    let resp = await fetch(
      `/api/rooms/${roomId}/tasks/${taskId}`,
      {
        method: "DELETE"
      }
    );
  }

  const handleUpdateTask = async (taskId: string, completionStatus: boolean) => {
    let resp = await fetch(
      `/api/rooms/${roomId}/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          completionStatus: completionStatus
        })
      }
    );
  }


  useEffect(() => {
    // Set a maximum height for the list container when tasks exceed a certain number
    const maxTasksToShow = 3; // Adjust this number as needed
    if (tasks.length > maxTasksToShow) {
      setListContainerHeight('300px'); // Set the desired maximum height in pixels
    } else {
      setListContainerHeight('auto');
    }
    (async () => {
      if (!isLoaded) {
        await handleGetTasks();
        setIsLoaded(true);
      }
    })();

  }, [tasks]);

  return (
    <div className="p-2">
      <div className="flex">
        <input
          type="text"
          className="input w-full  input-sm"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="btn btn-primary btn-sm"
          onClick={async (e) => {
            if (newTask) {
              e.preventDefault();
              await handleAddTask(newTask);
              await handleGetTasks();
              setNewTask("");
            }
          }}
        >
          Add
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {tasks.map((task, index) => (
          <div key={`task.id-${task.id}`} className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                
                checked={task.completionStatus}
                onChange={async (e) => {
                  const completionStatus = !task.completionStatus;

                  const taskId = task.id.toString();
                  await handleUpdateTask(taskId, completionStatus);
                  await handleGetTasks();
                }}
              />
              <span
                className={task.completionStatus ? 'line-through text-gray-400 ml-2' : 'ml-2'}
              >
                {task.taskDescription}
              </span>
            </label>
            <button
              className="btn btn-outline btn-square btn-danger"
              onClick={async (e) => {
                e.preventDefault();
                const taskId = task.id.toString();
                await handleDeleteTask(taskId);
                await handleGetTasks();
              }}
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
              width: `${(tasks.filter((task) => task.completionStatus).length /
                tasks.length) *
                100}%`,
            }}
          ></div>
        </div>
        <p className="text-sm mt-2 p-2">
          {tasks.filter((task) => task.completionStatus).length} of {tasks.length} tasks completed
        </p>
      </div>
    </div>
  );
};

export default ToDoList;
