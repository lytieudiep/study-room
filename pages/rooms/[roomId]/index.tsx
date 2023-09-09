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
import { songs } from '../../../components/song';
import { useRouter } from 'next/router';
import VideoRoom from '@/components/VideoRoom';


export default function RoomPage() {

    const router = useRouter();
    const roomId = router.query.roomId?.toString();

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

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const currentSong = songs[currentSongIndex];

    const playNextSong = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex === songs.length - 1 ? 0 : prevIndex + 1
        );
    }
    const session = useSession();

    if(!roomId) {
        return <>Loading...</>
    }

    return (
        <>
            <div className="">
                {/* <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">FocusZone</a>
                </div> */}

                {/* centered items in nav bar */}
                <div className="navbar bg-transparent flex items-center justify-center" >
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
                </div>

                <div className="absolute top-0 right-0 p-2">
                    {(session.status == "authenticated") ?
                        <SignOutButton />
                        : <SignInButton />
                    }
                </div>
            </div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Background imageUrl={selectedImageUrl}>
                        <div className="container min-h-full">
                            <div className="bg-white justify-center p-4">
                                {/* <VideoRoom/> */}
                            </div>


                            <div className="absolute z-0 inset-x-0 bottom-20 flex justify-center" style={{ background: "transparent" }}>
                                <BackgroundSwitcher
                                    onImageChange={handleImageChange}
                                    imageLibrary={imageLibrary}
                                />
                            </div>
                            <ChatComponent />
                        </div>

                    </Background>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side z-10 min-h-screen">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-96 max-w-96 bg-neutral text-base-content z-10 mb-20 overflow-y-scroll">
                        {/* Sidebar content here */}
                        {/* pomodoro timer */}
                        <div className="collapse bg-base-100 shadow-xs p-4">
                            <PomodoroTimer />
                        </div>
                        <br></br>
                        {/* Todo list */}
                        <div className="collapse bg-base-200 shadow-xl">
                            <h1 className="collapse-title text-md font-medium">Todo List</h1>
                            <TodoList roomId={roomId} />
                        </div>
                        <br></br>
                        {/* Youtube music */}
                        <div className="collapse bg-base-200 shadow-xl">
                            <h1 className="collapse-title text-md font-medium">Music Player</h1>
                            <div className="">
                                <div className="md:w-2/3 p-2">
                                    <MusicPlayer videoUrl={currentSong.url} />
                                </div>

                                <div className=" p-4">
                                    {/* <h2 className="text-lg font-semibold mb-4">{currentSong.title}</h2> */}

                                    <button
                                        className="btn btn-primary p-2 text-white rounded-md"
                                        onClick={playNextSong}
                                    >
                                        Play Next Song
                                    </button>
                                </div>
                            </div>


                        </div>
                        <br></br>
                    </ul>
                </div>
            </div>
        </>
    )
}