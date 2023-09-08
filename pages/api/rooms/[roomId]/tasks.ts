import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        const method = req.method;
        const roomId = req.query.roomId?.toString();
        const prismaClient = new PrismaClient();

        if (!roomId) {
            res.status(400).json({
                "message": "RoomID required."
            })
            return
        }

        var roomIdInt;

        try {
            roomIdInt = parseInt(roomId)

        } catch (e) {
            res.status(400).json({
                "message": "RoomID must be an integer"
            })
            return
        }

        if (method === "GET") {
            const tasks = await prismaClient.task.findMany({
                where: {
                    roomId: roomIdInt,
                }
            });
            res.status(200).json({
                "data": tasks
            })
        } else if (method === "POST") {

            const userEmail = session.user?.email?.toString();

            if (!userEmail) {
                res.status(403).json({
                    "message": "Not logged in"
                })
                return
            }

            const user = await prismaClient.user.findUnique({
                where: {
                    email: userEmail
                }
            });

            if (!user) {
                res.status(403).json({
                    "message": "User not found"
                })
                return
            }

            const taskDescription = req.body.taskDescription;

            if (!taskDescription) {
                res.status(400).json({
                    "message": "Task Description is required."

                });
                return
            }

            const newTask = {
                userId: user.id,
                roomId: parseInt(roomId),
                taskDescription: taskDescription.toString(),
                completionStatus: false,
                dueDate: new Date()
            }

            const createdTask = await prismaClient.task.create({ data: newTask })
            res.status(200).json({ data: createdTask })
        } else {
            res.status(405).json({
                message: "Method not allowed."
            });
        }

    } else {
        res.status(403).json({
            message: "You are not logged in."
        });
    }
}