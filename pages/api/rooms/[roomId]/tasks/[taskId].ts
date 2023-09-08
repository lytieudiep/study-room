import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        const method = req.method;
        const roomId = req.query.roomId?.toString();
        const taskId = req.query.taskId?.toString();

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

        if (!taskId) {
            res.status(400).json({
                "message": "TaskId required."
            })
            return
        }

        var taskIdInt;

        try {
            taskIdInt = parseInt(taskId)

        } catch (e) {
            res.status(400).json({
                "message": "TaskId must be an integer"
            })
            return
        }

        const task = await prismaClient.task.findUnique({
            where: {
                id: taskIdInt
            },
            include: {
                user: true
            }
        })

        if (!task) {
            res.status(404).json({
                message: "Task not found"
            })
            return
        }

        // TODO: check if participant instead
        const currentUser = await prismaClient.user.findUnique({
            where: {
                email: session.user?.email?.toString()
            }
        })

        if (!currentUser) {
            res.status(403).json({
                message: "Not logged in"
            })
            return
        }

        if (task.user.id != currentUser.id) {
            res.status(401).json({
                message: "Not authorized to modify task"
            })
            return
        }

        if (method === "PUT") {

            const taskCompletionStatus = req.body.completionStatus || false;

            await prismaClient.task.update({
                where: {
                    id: taskIdInt
                },
                data: {
                    completionStatus: taskCompletionStatus
                }
            })
            const updatedTask = await prismaClient.task.findUnique({
                where: {
                    id: taskIdInt
                }
            })

            res.status(200).json({ data: updatedTask });
            return

        } else if (method === "DELETE") {
            await prismaClient.task.delete({ where: { id: taskIdInt } })
            res.status(200).json({
                data: task
            })
            return
        } else {
            res.status(405).json({
                message: "Method not allowed."
            });
        }
    }
    else {

        res.status(403).json({
            message: "You are not logged in."
        });
    }
}