"use client";

import { useState } from 'react';
import PomodoroTimer from '../../../components/PomodoroTimer';
import TodoList from '../../../components/TodoList';
import Layout from '../../../components/Layout';
import MusicPlayer from '../../../components/MusicPlayer';
import { FiVideo } from 'react-icons/fi';



interface SpaceIdParams {
    spaceId: string
}

function Chatbox() {
    const [open, setOpen] = useState(false);

    if (open) {
        return <div className="fixed bottom-0 right-0 justify-end items-end h-auto h-max-96">
            <div className="bg-base-200 px-4 py-4 rounded-md space-y-2">
                <span className="flex justify-between">
                    <div className="text-xl font-medium">Chat</div>

                    <button
                        className="btn btn-circle btn-ghost btn-xs ml-auto"
                        onClick={() => { setOpen(false) }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </span>
                <ul className="w-80 bg-base-200 h-96 text-base-content overflow-y-scroll">
                    {/* Sidebar content here */}

                    <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-primary">What kind of nonsense is this</div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-secondary">Put me on the Council and not make me a Master!??</div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-accent">That's never been done in the history of the Jedi. It's insulting!</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-success">You have been given a great honor.</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-warning">To be on the Council at your age.</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-error">It's never happened before.</div>
                    </div>
                </ul>
                <textarea className="textarea textarea-bordered w-full" placeholder="Bio"></textarea>
                <button className="btn btn-primary">Send</button>
            </div>
        </div>
    } else {
        return <div className="relative">
            <div className="fixed bottom-5 right-5 flex justify-end items-end">
                <button
                    className=" bg-white px-4 py-2 rounded-3xl"
                    onClick={() => { setOpen(true) }}>Open Chat</button>
            </div>

        </div>

    }
}

export default function SpaceId({ params }: { params: SpaceIdParams }) {

    const [videoId, setVideoId] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoId(event.target.value);
    };

    return (
        <>
            <div className="container min-h-full min-w-full bg-indigo-600">
                {/* Navbar */}
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">FocusZone</a>
                    </div>

                    {/* centered items in nav bar */}
                    <nav className="navbar flex items-center justify-center">
                        <ul className="menu menu-horizontal bg-base-200 rounded-box">
                            <li>
                                <h4 className="text-5xs primary">Zoe's room</h4>
                            </li>
                            <li>
                                <a className="tooltip" data-tip="Home">
                                    <button className="btn btn-secondary btn-xs">Invite friend</button>
                                </a>
                            </li>
                            <li>
                                <a className="tooltip" data-tip="Details">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </a>
                            </li>
                            <li>
                                <a className="tooltip" data-tip="Stats">
                                    <FiVideo></FiVideo>
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
                <div className="grid grid-cols-2">

                    {/* Side bar left */}
                    <div className="col-span-1">
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
                                    <div className="bg-base-100 shadow-xs">
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
                    <div className="col-span-1"></div>
                </div>
            </div>
            <Chatbox />

        </>
    )
}