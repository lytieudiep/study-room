import "../stylesheets/globals.css";

export default function RegisterPage() {
    return <div className="space-y-2 text-center pt-10">
        <h3 className="text-3xl font-semibold pb-3">Register</h3>
        <div>
            <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs" />
        </div>
        <div>
            <input type="password" placeholder="Password}" className="input input-bordered w-full max-w-xs" />
        </div>
        <div>
            <button className="btn">Register</button>
        </div>
    </div>
}
