"use client"; 

import Image from 'next/image'
import { useState } from 'react';
import PomodoroTimer from '../../../components/PomodoroTimer';
import TodoList from '../../../components/TodoList';
import Layout from '../../../components/Layout';
import MusicPlayer from '../../../components/MusicPlayer';


interface SpaceIdParams {
    spaceId: string
}

export default function SpaceId({ params }: { params: SpaceIdParams }) {
    
    const [videoId, setVideoId] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoId(event.target.value);
    };

    return (
        <>
            <div className="container min-h-full min-w-full">
                {/* Navbar */}
                <div className="navbar bg-base-300">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">FocusZone</a>
                    </div>

                    {/* centered items in nav bar */}
                    <nav className="navbar flex items-center justify-center">
                        <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
                            <li>
                                <a className="tooltip" data-tip="Home">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </a>
                            </li>
                            <li>
                                <a className="tooltip" data-tip="Details">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </a>
                            </li>
                            <li>
                                <a className="tooltip" data-tip="Stats">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                        </button>
                    </div>
                </div>


                {/* Side bar */}
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            {/* pomodoro timer */}
                            <div className="bg-base-100 shadow-xl">
                                <div className="collapse bg-base-200 shadow-xl">
                                    <h1 className="collapse-title text-xl font-medium">Pomodoro Timer</h1>
                                    <PomodoroTimer />
                                </div>
                            </div>
                            <br></br>
                            {/* Todo list */}
                            <div className="collapse bg-base-200 shadow-xl">
                                <h1 className="collapse-title text-xl font-medium">Todo List</h1>
                                <TodoList />
                            </div>
                            <br></br>
                            {/* Youtube music */}
                            <div className="collapse bg-base-200 shadow-xl">
                                <figure>{videoId && <MusicPlayer videoId={videoId} />}</figure>
                                <div className="p-5">
                                    <h1 className="collapse-title text-xl font-medium">YouTube Music</h1>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            className="form-input mr-2 flex-grow px-2 py-1"
                                            placeholder="Enter YouTube video ID"
                                            value={videoId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <p>{videoId}</p>
                                </div>
                            </div>
                        </ul>

                    </div>
                </div>
            </div>



        </>
    )
}