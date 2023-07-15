import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        const prismaClient = new PrismaClient();
        

        res.status(200).json({});
    } else {
        res.status(403).json({
            message: "You are not logged in."
        });
    }
}