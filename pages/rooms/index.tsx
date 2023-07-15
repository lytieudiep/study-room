import { useSession } from "next-auth/react";
import Link from "next/link";

const MyRooms = () => {
    const sessionData = useSession();
    return <>
        <div className="space-y-4 pt-16">
            <div className="flex justify-center items-center">
                <h1 className="font-bold text-3xl">My Rooms</h1>
            </div>
            <div className="flex justify-center items-center">
                <Link href="/rooms/create">
                    <button className="btn btn-primary">Create New Room</button>
                </Link>
            </div>
        </div>
    </>
}

export default MyRooms;