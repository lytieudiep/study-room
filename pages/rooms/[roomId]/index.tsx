"use client";

import { useEffect, useState } from 'react';
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
import Head from 'next/head';
import { GetServerSideProps } from "next";
import StudyRoomPrismaClient from '@/lib/db';
import styles from "./index.module.css";
import Link from 'next/link';
import CopyButton from '../../../components/CopyButton';





const InviteCodeModal = ({ inviteCode }: { inviteCode: string | null }) => {
    const textToCopy = inviteCode ?? '';

    return (
        <dialog id="invite_code_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-primary">Invite a friend!</h3>
                <p className="py-4 text-primary-content">You can invite a friend by sharing this code and linking them to this page</p>
                <div className="flex justify-content- items-center">
                    <p className="flex text-center text-accent text-bold items-center ml-4">{inviteCode || ''}</p>
                    <div className="flex-1 p-2">

                        <CopyButton textToCopy={textToCopy} />
                    </div>
                </div>

                <div className=" flex modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-neutral absolute right-2 top-2" aria-label="close">✕</button>



                    </form>
                </div>
            </div>
        </dialog >
    )
}

interface RoomPageProps {
    roomName: string | null,
    roomId: number | null,
    inviteCode: string | null
}

export const getServerSideProps: GetServerSideProps<RoomPageProps> = async (context) => {
    const { roomId } = context.query;

    var roomIdInt;
    try {
        roomIdInt = parseInt(roomId as string);
    } catch (error) {
        console.log(error);
        return {
            props: {
                roomName: null,
                roomId: null,
                inviteCode: null
            }
        }
    }

    const room = await StudyRoomPrismaClient.room.findUnique({
        where: {
            id: roomIdInt
        }
    });

    const inviteCode = room?.inviteCode?.toString();


    return {
        props: {
            roomName: room?.name || null,
            roomId: roomIdInt,
            inviteCode: inviteCode || null
        }
    }
}


export default function RoomPage({ inviteCode, roomName }: RoomPageProps) {

    const router = useRouter();
    const roomId = router.query.roomId?.toString();

    const videoLibrary = [
        // 'https://cdnb.artstation.com/p/assets/images/images/029/320/295/original/bogdan-mb0sco-coffeeanim.gif?1601147277',


        'https://studyroomimage1.s3.us-east-2.amazonaws.com/ezgif.com-gif-to-webm.webm',
        'https://studyroomimage1.s3.us-east-2.amazonaws.com/ezgif.com-resize.webm',
        'https://studyroomimage1.s3.us-east-2.amazonaws.com/ezgif.com-gif-to-webm1.webm',
    ];

    const [selectedVideoUrl, setSelectedVideoUrl] = useState(videoLibrary[0]); // Set a default image URL

    const handleVideoChange = (videoUrl: string) => {
        setSelectedVideoUrl(videoUrl);
    }

    const [showVideo, setShowVideo] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [youtubeUrl, setYoutubeUrl] = useState<string>('');
    const currentSong = songs[currentSongIndex];

    const playNextSong = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex === songs.length - 1 ? 0 : prevIndex + 1
        );
    }
    const session = useSession();

    if (!roomId) {
        return <>Loading...</>
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYoutubeUrl(e.target.value);
    }

    return (
        <>
            <Head>
                <title>{roomName}</title>

                <meta name="Study room" property="og:title" content="Study room" key="title" lang="en" />
                <link rel="preconnect" href="https://focuszone.net" />
                <style>
                    {`
                        body {
                        overflow: hidden;
                        }
                    `}
                </style>
            </Head>


            {/* centered items in nav bar */}
            <div className="navbar navbar-sm bg-base-100">
                <div className="navbar-start">

                    <Link href={'/rooms'}
                        className="btn btn-primary"
                    >
                        My Rooms
                    </Link>

                </div>

                <ul className=" navbar-center menu menu-horizontal menu-xs  bg-secondary rounded-box">
                    <li>
                        <h4 className="text-5xs text-primary-content">{roomName}</h4>
                    </li>
                    <li>

                        <button aria-label="invite friend" onClick={() => {
                            // @ts-ignore
                            document.getElementById('invite_code_modal')?.showModal();
                        }} className="btn btn-info btn-xs">Invite friend</button>

                    </li>
                    <li>
                        <button id="text" aria-label="video call" onClick={() => {
                            setShowVideo(!showVideo);
                        }} className="tooltip" data-tip="Open video">
                            <FiVideo></FiVideo>
                        </button>
                    </li>
                </ul>

                <div className="navbar-end">
                    {(session.status == "authenticated") ?
                        <SignOutButton />
                        : <SignInButton />
                    }
                </div>
            </div>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />

                <Background videoUrl={selectedVideoUrl}>
                    <div>
                        <div className={styles.video_call}>
                            {(showVideo) ? <VideoRoom /> : <></>}
                        </div>


                        <div className="fixed bottom-0 left-0 right-0 flex justify-center" style={{ background: "transparent" }}>
                            <BackgroundSwitcher
                                onVideoChange={handleVideoChange}
                                videoLibrary={videoLibrary}
                            />
                        </div>
                        <ChatComponent />
                    </div>

                </Background>

                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <div className="drawer-side w-16">
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
                            <h1 className="card-title text-sm font-medium pl-4 p-2">Todo List</h1>
                            <TodoList roomId={roomId} />
                        </div>
                        <br></br>
                        {/* Youtube music */}
                        <div className="collapse bg-base-200 shadow-xl">
                            <h1 className="card-title text-sm font-medium p-3">Music Player</h1>
                            <div className="flex">
                                <div className="flex-1 md:w-2/3 p-2">
                                    <MusicPlayer videoUrl={currentSong.url} />
                                </div>

                                <div className=" p-4">
                                    {/* <h2 className="text-lg font-semibold mb-4">{currentSong.title}</h2> */}

                                    <button
                                        className="btn btn-primary text-primary-content p-2 ml-2"
                                        onClick={playNextSong}
                                    >
                                        Next Song
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="collapse bg-base-200 shadow-xl">
                            <div className=" items-center justify-between p-2">
                                <h1 className="card-title text-sm font-medium p-2">Media</h1>
                                <div className="p-2">
                                    <MusicPlayer videoUrl={youtubeUrl} />
                                    <input
                                        type="text"
                                        className="input w-full input-sm max-w-xxs p-2 mt-2"
                                        placeholder="Paste YouTube Id here"
                                        value={youtubeUrl}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                        </div>

                        <br></br>
                    </ul>
                </div >
                <InviteCodeModal inviteCode={inviteCode} />
            </div>
        </>
    )
}