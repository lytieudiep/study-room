"use client";

import { useState } from 'react';
import PomodoroTimer from '../../../components/PomodoroTimer';
import TodoList from '../../../components/TodoList';
import MusicPlayer from '../../../components/MusicPlayer';
import { FiVideo } from 'react-icons/fi';
import SignInButton from '@/components/SignInButton';
import { useSession } from 'next-auth/react';
import SignOutButton from '@/components/SignOutButton';
import ChatComponent from '../../../components/ChatComponent';
import Background from '../../../components/Background';
import BackgroundSwitcher from '../../../components/BackgroundSwitcher';





interface RoomParams {
    spaceId: string
}

export default function RoomPage({ params }: { params: RoomParams }) {

    const imageLibrary = [
        'https://i.pinimg.com/originals/4a/65/ab/4a65abeead3a8d113bccfee5d5d239f4.gif',
        'https://cdnb.artstation.com/p/assets/images/images/029/320/295/original/bogdan-mb0sco-coffeeanim.gif?1601147277',
        'https://cdnb.artstation.com/p/assets/images/images/025/079/567/original/ngan-pham-lil-ants-anim-test-v06.gif?1584542703',
        
        // Add more image URLs to the library
    ];

    const [selectedImageUrl, setSelectedImageUrl] = useState(imageLibrary[0]); // Set a default image URL

    const handleImageChange = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl);
    }

    const [videoId, setVideoId] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoId(event.target.value);
    };

    const session = useSession();

    return (
        <>
            <Background imageUrl={selectedImageUrl}>
                <div className="container min-h-full min-w-full">
                    <div>
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
                                {(session.status == "authenticated") ?
                                    <SignOutButton />
                                    : <SignInButton />
                                }
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
                                        <ul className="menu p-4 w-96 max-w-96 bg-base-200 text-base-content">
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
                                                <h1 className="collapse-title text-xl font-medium">YouTube Music</h1>
                                                <div className="p-5">
                                                    <figure>{videoId && <MusicPlayer videoId={videoId} />}</figure>
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
                                            <br></br>
                                            <div className="collapse bg-base-200 shadow-xl">
                                            <BackgroundSwitcher
                                                onImageChange={handleImageChange}
                                                imageLibrary={imageLibrary}
                                            />
                                            </div>

                                            <br></br>


                                        </ul>

                                    </div>
                                </div>
                            </div>


                            <div className="col-span-1"></div>

                        </div>

                    </div>
                    <ChatComponent />

                </div>
            </Background>
        </>
    )
}