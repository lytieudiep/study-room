import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        const userEmail = session.user?.email;
        const prismaClient = new PrismaClient();
        const user = await prismaClient.user.findUnique({
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

        if (!req.body.name) {
            res.status(400).json({
                message: "You need to specify a name."
            })
            return;
        }

        const inviteCode = nanoid(16);

        const newRoom = await prismaClient.room.create({
            data: {
                name: req.body.name,
                creationDate: new Date(),
                userId: user.id,
                inviteCode,
            }
        });

        await prismaClient.participant.create({
            data: {
                userId: user.id,
                roomId: newRoom.id,
                joinDate: new Date(),
            }
        });

        res.status(200).json(newRoom);
    } else {
        res.status(403).json({
            message: "You are not logged in."
        });
    }
}