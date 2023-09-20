import Head from "next/head";
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
        <Head>
            <title>Create room</title>
            <meta name="Create room" property="og:title" content="Create a new room" key="title" />
        </Head>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Create a New Room</h1>
                    <p className="py-6">Generate a fresh space, assign a unique name to your room, and embark on your learning adventure.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">


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
                </div>
            </div>
        </div>
    </>
}

export default CreateRoom;