import { userIsParticipant } from "@/lib/auth";
import StudyRoomPrismaClient from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const method = req.method;
    const inviteCode = req.body.inviteCode;

    if (!inviteCode) {
        res.status(400).json({
            message: "You need to specify an invite code."
        })
        return;
    }

    const userSession = await getServerSession(req, res, authOptions);
    if (!userSession) {
        res.status(403).json({
            message: "You are not logged in."
        });
        return;
    }

    const userEmail = userSession.user?.email;
    const user = await StudyRoomPrismaClient.user.findUnique({
        where: {
            email: userEmail || ""
        }
    });
    if (!user) {
        res.status(403).json({
            message: "Authentication error."
        });
        return;
    }


    if (method === "POST") {
        const room = await StudyRoomPrismaClient.room.findUnique({
            where: {
                inviteCode: inviteCode
            }
        });

        if (!room) {
            res.status(404).json({
                message: "Room not found."
            })
            return;
        }

        const isParticipant = await userIsParticipant(room.id, user.id);

        if (isParticipant) {
            res.status(400).json({
                message: "You are already in this room."
            })
            return;
        } else {
            const newParticipant = await StudyRoomPrismaClient.participant.create({
                data: {
                    userId: user.id,
                    roomId: room.id,
                    joinDate: new Date()
                }
            });
            res.status(200).json(newParticipant);
            return;
        }
    }
}