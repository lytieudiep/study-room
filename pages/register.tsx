import { useState } from "react";
import "../stylesheets/globals.css";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        console.log("DEBUG:", email, password);
    }

    return <form onSubmit={async (e) =>{
        await handleSubmit();
        e.preventDefault();
    }} className="space-y-2 text-center pt-10">
        <h3 className="text-3xl font-semibold pb-3">Register</h3>
        <div>
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
                placeholder="Password}" 
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
