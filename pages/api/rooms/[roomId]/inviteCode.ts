import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import StudyRoomPrismaClient from "@/lib/db";
import { nanoid } from "nanoid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const roomId = req.query.roomId?.toString();
    if (!roomId) {
        res.status(400).json({ error: "roomId is required" });
        return;
    }

    const method = req.method;
    const session = await getServerSession(req, res, authOptions);

    const email = session?.user?.email?.toString();

    if (!email) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (method === "GET") {
        const prismaClient = StudyRoomPrismaClient;
        const room = await prismaClient.room.findUnique({
            where: {
                id: parseInt(roomId)
            }
        });
        if (!room) {
            res.status(404).json({ error: "Room not found" });
            return;
        }
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        if (user.id === room.userId) {
            if (!room.inviteCode) {
                const newInviteCode = nanoid(12);
                await prismaClient.room.update({
                    where: {
                        id: room.id
                    },
                    data: {
                        inviteCode: newInviteCode
                    }
                });
                res.status(200).json({ inviteCode: newInviteCode });
                return
            } else {
                res.status(200).json({ inviteCode: room.inviteCode });
                return
            }

        } else {
            res.status(403).json({ error: "Forbidden" });
        }

    } else {
        res.status(405).json({ error: "Method not allowed" });
    }

}