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
        <div className="space-y-4 pt-16 bg-base-100">
            <div className="flex justify-center items-center">
                <h1 className="font-bold text-3xl">My Rooms</h1>
            </div>
            <div className="flex justify-center items-center">
                <Link href="/rooms/create">
                    <button className="btn btn-primary">Create New Room</button>
                    <h2 className="flex text text-xl text-primary-content justify-center items-center">Or</h2>
                </Link>
            </div>
            <div>

            </div>
            <div className="flex justify-center items-center">

                <Link href={'/rooms/join'}
                    className="flex-start btn btn-secondary"
                >
                    Join Room
                </Link>

            </div>

            <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-2 gap-4 auto-rows-max">
                    {rooms?.map((room, index) => {
                        return <div key={room.id} className="p-2">
                        <RoomCard index={index} room={room} />
                    </div>
                    })}
                </div>
            </div>

        </div>
    </>
}

export default MyRooms;