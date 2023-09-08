import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const CHAT_SECRET = "CHAT_SECRET";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(404)
        return
    }

    const session = await getServerSession(req, res, authOptions);
    if (session) {
        let email = session.user?.email?.toString();

        if (!email) {
            res.status(403).json({ message: "Not logged in" });
            return
        }

        let reqBody = JSON.parse(req.body);
        let roomId = reqBody["roomId"];
        const prismaClient = new PrismaClient();

        const currentUser = await prismaClient.user.findUnique({
            where: { email }
        })

        if (!currentUser) {
            res.status(403).json({ message: "User not found" });
            return
        }
        let identityToken = jwt.sign({
            userId: currentUser.id,
            email: email,
            roomId: roomId
        }, CHAT_SECRET);
        res.status(200).json({
            email,
            identityToken
        })

    } else {
        res.status(403)
    }
}