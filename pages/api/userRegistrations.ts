import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

function isValidEmail(email: string): boolean {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        if (isValidEmail(req.body.email)) {
            const email = req.body.email;
            const password = req.body.password;
            const saltRounds = 10;

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            let prismaClient = new PrismaClient();


            try {
                const existingUser = await prismaClient.user.findUnique({
                    where: {
                        email: email
                    }
                });

                if (existingUser) {
                    res.status(400).json({
                        message: "Email already registered."
                    });
                    return;
                }
                await prismaClient.user.create({
                    data: {
                        username: email,
                        email: email,
                        password: hashedPassword
                    }
                })

                res.status(200).json({
                    message: "Welcome stranger!"
                });
            } catch {
                res.status(500).json({
                    message: "Something broke."
                });
            }

        } else {
            res.status(400).json({
                message: "Your email is invalid. Please enter a valid email address."
            })
        }
    } else {
        res.status(405).json({
            "message": "nobody here"
        });
    }
}