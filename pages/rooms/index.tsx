import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]";
import RoomCard from "@/components/RoomCard";
import { RoomTruncated } from "@/entities/rooms";

interface MyRoomProps {
    rooms: RoomTruncated[]
}

export const getServerSideProps: GetServerSideProps<MyRoomProps> = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (session) {
        const prismaClient = new PrismaClient();
        const userEmail = session.user?.email?.toString();
        const user = await prismaClient.user.findUnique({
            where: {
                email: userEmail,
            }
        });
        if (user) {
            const rooms = await prismaClient.room.findMany({
                where: {
                    userId: user.id
                }
            });
            return {
                props: {
                    rooms: rooms.map((room) => {
                        return {
                            ...room,
                            creationDate: room.creationDate.toISOString()
                        }
                    })
                }
            }
        }
    }

    return {
        props: {
            rooms: []
        }
    }
}


const MyRooms: React.FC<MyRoomProps> = ({ rooms }) => {
    const sessionData = useSession();
    return <>
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <div className="flex justify-end m-4">



                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="flex text-left">
                        <h1 className="title font-bold text-3xl m-4">My rooms</h1>

                    </div>
                    <div>
                        <p className="text-left m-2">List of rooms you have created</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 auto-rows-max">
                        {rooms?.map((room, index) => {
                            return <div key={room.id} className="p-2">
                                <RoomCard index={index} room={room} />
                            </div>
                        })}
                    </div>
                </div>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <span
                        onClick={() => {
                            // Handle the "Go Back" action here
                            window.history.back(); // You can use this to go back in the browser's history
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        &larr; Go Back
                    </span>
                    <div className=" m-4">
                        <h1 className="title justify-start font-bold text-3xl">FocusZone</h1>
                    </div>
                    <br></br>
                    <li><a>My rooms</a></li>
                    <li><a>Community</a></li>
                    <div className="divider"></div>
                    <div className="flex flex-col justify-between h-full"></div>
                    <div className="m-4">
                        <Link href="/rooms/create">
                            <button className="btn btn-primary">Create New Room</button>
                        </Link>
                    </div>

                    <div className="m-4">
                        <Link href="/rooms/join" className="btn btn-secondary">
                            Join Room
                        </Link>
                    </div>
                </ul>

            </div>
        </div>

    </>
}

export default MyRooms;