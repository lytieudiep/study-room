import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
    secret: "SECRET",
    callbacks: {
        async signIn({ user }) {
            const email = user.email;
            try {

                const prismaClient = new PrismaClient();
                const existingUser = await prismaClient.user.findUnique({
                    where: {
                        email: email,
                    },
                }
                );
                if (!existingUser) {
                    await prismaClient.user.create({
                        data: {
                            username: email,
                            email,
                        }
                    })
                }
            } catch (e) {
                return false

            }
            return true;
        }
    }
}
export default NextAuth(authOptions)