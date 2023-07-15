import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateRoom = () => {

    const [roomName, setRoomName] = useState<undefined | string>();
    const router = useRouter();

    const handleSubmit = async () => {
        if (roomName) {
            let response = await fetch(
                "/api/newRoom", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: roomName
                })
            });
            if (response.status == 200) {
                let respBody = await response.json();
                let roomId = respBody["id"];
                router.push(`/rooms/${roomId}`);
            }
        }
    }


    return <>

        <div className="space-y-4 pt-16 container mx-auto ">
            <h1 className="text-center justify-center font-bold text-3xl">Create a New Room</h1>
            <form className="justify-center space-y-2"
                onSubmit={async (e) => {
                    e.preventDefault();
                    await handleSubmit();
                }}

            >
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Give your room a name.</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                        value={roomName}
                        onChange={(e) => {
                            setRoomName(e.target.value);
                        }}

                    />
                </div>
                <span className="flex space-x-3">
                    <button type="submit" className="btn btn-primary">Create</button>
                    <Link href="/rooms"><button className="btn btn-ghost">Cancel</button></Link>
                </span>
            </form>

        </div>
    </>
}

export default CreateRoom;