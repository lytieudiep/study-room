import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async () => {
        if(!router) {
            console.log("Warning: Router not present.")
        };

        let resp = await fetch(
            "/api/userRegistrations",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }
        )
        if (resp.status == 200) {
            console.log("Redirecting to login page");
            await router.push("/login")
        } else {
            let resp_json = await resp.json();
            let message = resp_json['message'];
            setErrorMessage(message);
        }
    }

    return <form onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit();
    }} className="space-y-2 text-center pt-10">
        <h3 className="text-3xl font-semibold pb-3">Register</h3>
        <div>
            {(errorMessage) ? <p className="text-red-500 pb-2">{errorMessage}</p> : null}
            <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full max-w-xs"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
        </div>
        <div>
            <input
                type="password"
                placeholder="Password   "
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
        </div>
        <div>
            <button
                type="submit"
                className="btn"
            >Register</button>
        </div>
    </form>
}
