// components/Sidebar.tsx
import React from 'react';
import { FiClock, FiList, FiMusic } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  return (
    <nav className="bg-gray-800 w-24 h-screen p-4">
      <ul>
        <li className="mb-4">
          <a href="#">
          <button className="flex items-center text-white">
            <FiClock className="mr-2" />
            <span> Timer </span>
            </button>
          </a>
        </li>
        <li className="mb-4">
          <a href="#">
            <FiList className="mr-2" />
            Todo List
          </a>
        </li>
        <li className="mb-4">
          <a href="#">
            <FiMusic className="mr-2" />
            Music
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
