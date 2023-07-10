"use client"; 

import { useState } from 'react';

interface Todo {
  id: string;
  label: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo: Todo = {
        id: Date.now().toString(),
        label: newTodo,
        completed: false,
      };

      setTodos((prevTodos) => [...prevTodos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (todoId: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex mb-4">
        <input
          type="text"
          className="input input-primary w-full mr-4"
          placeholder="Enter todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      {todos.length > 0 ? (
        <ul className="list-disc pl-6">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary mr-2"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.label}</span>
              <button
                className="btn btn-ghost btn-xs ml-auto"
                onClick={() => removeTodo(todo.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 4.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos yet.</p>
      )}
    </div>
  );
};
export default TodoList;
