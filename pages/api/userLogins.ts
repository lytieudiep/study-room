import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const email = req.body.email;
        const password = req.body.password;
        const prismaClient = new PrismaClient();
        const user = await prismaClient.user.findUnique(
            {
                where: {
                    email
                }
            }
        );

        if (user) {
            const passwordMatches = await bcrypt.compare(password, user.password);
            if (passwordMatches) {
                res.status(200).json({
                    message: `Welcome, ${email}`
                })

            } else {
                res.status(403).json({message: "Invalid credentials."});
            }
        } else {
            res.status(404).json({ message: "Account not found."});
        }

    } else {
        res.status(404).json({ message: "Sorry, not found." });
    }
}