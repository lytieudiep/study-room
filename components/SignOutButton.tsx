import { useSession, signOut } from "next-auth/react"

const SignOutButton = () => {

    const { data: session } = useSession();

    if (!session) {
        return null

    } else {
        return <>
            <button className="btn btn-primary btn-md" onClick={() => { signOut() }}>
                Sign out
            </button>
        </>
    }
}

export default SignOutButton;