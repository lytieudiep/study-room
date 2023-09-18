import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const JoinPage = () => {

    const [joinCode, setJoinCode] = useState<undefined | string>();
    const router = useRouter();
    
    const handleSubmit = async () => {
        if (joinCode) {
            let response = await fetch(
                "/api/joinRoom", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    inviteCode: joinCode
                })
            });
            if (response.status == 200) {
                let respBody = await response.json();
                let roomId = respBody["roomId"];
                router.push(`/rooms/${roomId}`);
            }
        }
    }

    return <>
        <Head>
            <title>Join room</title>
            <meta name="Join room" property="og:title" content="Join a new room" key="title" />
        </Head>
        <div className="space-y-4 pt-16 container mx-auto">
            <h1 className="text-center justify-center font-bold text-3xl">Join a Room</h1>
            <form className="justify-center space-y-2"
                onSubmit={async (e) => {
                    e.preventDefault();
                    await handleSubmit();
                }}

            >
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Enter join code.</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                        value={joinCode}
                        onChange={(e) => {
                            setJoinCode(e.target.value);
                        }}

                    />
                </div>
                <span className="flex space-x-3">
                    <button type="submit" className="btn btn-primary">Join</button>
                    <Link href="/rooms"><button className="btn btn-ghost">Cancel</button></Link>
                </span>
            </form>

        </div>
    </>
}

export default JoinPage;