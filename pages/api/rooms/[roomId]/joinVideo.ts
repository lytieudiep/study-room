import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { AccessToken } from "livekit-server-sdk";
import StudyRoomPrismaClient from "@/lib/db";
import { userIsParticipant } from "@/lib/auth";

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_SECRET = process.env.LIVEKIT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email?.toString();

    if (!email) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = await StudyRoomPrismaClient.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }


    const method = req.method;
    const roomId = req.query.roomId?.toString();
    if (!roomId) {
        res.status(400).json({ error: "roomId is required" });
        return;
    }

    var roomIdInt;
    try {
        roomIdInt = parseInt(roomId);
    } catch (error) {
        res.status(400).json({ error: "roomId must be an integer" });
        return;
    }

    const participant = await userIsParticipant(roomIdInt, user.id);

    if (!participant) {
        res.status(403).json({ error: "You are not a participant of this room" });
        return;
    }

    if (method === "GET") {

        const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_SECRET, { identity: email });

        at.addGrant({ room: roomId, roomJoin: true, canPublish: true, canSubscribe: true });
        const token = at.toJwt();
        res.status(200).json({ token });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }

}