import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import * as jwt from "jsonwebtoken";

const CHAT_SECRET = "CHAT_SECRET";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(404)
        return
    }

    const session = await getServerSession(req, res, authOptions);
    if (session) {
        let email = session.user?.email;

        let reqBody = JSON.parse(req.body);
        let roomId = reqBody["roomId"];

        let identityToken = jwt.sign({
            email: email,
            roomId: roomId
        }, CHAT_SECRET);
        res.status(200).json({
            identityToken
        })

    } else {
        res.status(403)
    }
}