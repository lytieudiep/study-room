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
import Head from 'next/head';
import { GetServerSideProps } from "next";
import StudyRoomPrismaClient from '@/lib/db';


const InviteCodeModal = ({inviteCode} : {inviteCode: string | null }) => {
    return (
        <dialog id="invite_code_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Invite a friend!</h3>
                <p className="py-4">You can invite a friend by sharing this code and linking them to this page</p>
                <p className="text-center">{inviteCode}</p>

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

interface RoomPageProps {
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
            roomId: roomIdInt,
            inviteCode: inviteCode || null
        }
    }
}


export default function RoomPage({ inviteCode} : RoomPageProps) {

    const router = useRouter();
    const roomId = router.query.roomId?.toString();

    const imageLibrary = [

        'https://i.pinimg.com/originals/4a/65/ab/4a65abeead3a8d113bccfee5d5d239f4.gif',
        'https://cdnb.artstation.com/p/assets/images/images/029/320/295/original/bogdan-mb0sco-coffeeanim.gif?1601147277',
        'https://cdnb.artstation.com/p/assets/images/images/025/079/567/original/ngan-pham-lil-ants-anim-test-v06.gif?1584542703',
        'https://steamuserimages-a.akamaihd.net/ugc/831329771678673548/49C66203D4484F804076D9E21376CE55F8BC2DFE/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
        'https://media4.giphy.com/media/IuVFGSQZTd6TK/giphy.gif?cid=ecf05e4796x9wxpr4muzt8czviaj5g2ubedb22dj1ofdand8&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    ];

    const [selectedImageUrl, setSelectedImageUrl] = useState(imageLibrary[0]); // Set a default image URL

    const handleImageChange = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl);
    }

    const [showVideo, setShowVideo] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
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

    return (
        <>
            <Head>
                <title>Main study room</title>
                <meta name="Study room" property="og:title" content="Study room" key="title" />
            </Head>
            <div className="  ">
                

                {/* centered items in nav bar */}
                <div className="navbar bg-base-100 flex items-center justify-center" >
                    <ul className="menu menu-horizontal menu-xs bg-base-content rounded-box">
                        <li>
                            <h4 className="text-5xs text-base-100">Zoe's room</h4>
                        </li>
                        <li>
                            <a className="tooltip" data-tip="Home">
                                <button onClick={() => {
                                    // @ts-ignore
                                    document.getElementById('invite_code_modal')?.showModal();
                                }} className="btn btn-secondary btn-xs">Invite friend</button>
                            </a>
                        </li>
                        <li>
                            <a className="tooltip primary" data-tip="Details">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => {
                                setShowVideo(!showVideo);
                            }} className="tooltip" data-tip="Open video">
                                <FiVideo></FiVideo>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="btn-xs absolute top-0 right-0 p-2">
                    {(session.status == "authenticated") ?
                        <SignOutButton />
                        : <SignInButton />
                    }
                </div>
            </div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className="drawer-content">
                        {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}

                        <Background imageUrl={selectedImageUrl}>
                            <div className="container ">
                                <div >
                                    {(showVideo) ? <VideoRoom /> : <></>}
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
                </div>
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
                                        className="btn btn-primary p-2 text-primary-content"
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
            <InviteCodeModal inviteCode={inviteCode} />
        </>
    )
}