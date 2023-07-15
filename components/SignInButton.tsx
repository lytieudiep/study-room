import { useSession, signIn } from "next-auth/react"

const SignInButton = () => {

    const { data: session } = useSession();

    if (session) {
        return null

    } else {
        return <>
            <button className="btn btn-primary" onClick={() => { signIn() }}>
                Sign in
            </button>
        </>
    }
}

export default SignInButton;