"use server"
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function postData(title: string, description: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("Not Authorized")
    }
    const Subscriber = await prisma.subscription.findUnique({
        where: {
            userId: user?.id,
        },
        select: {
            status: true
        }
    })
    const Uses = await prisma.user.findUnique({
        where: {
            id: user?.id
        },
        select: {
            Articles: true
        }
    });
    if (Uses?.Articles) {
        if (Uses?.Articles.length < 3) {
            console.log(Subscriber?.status)
            const data = await prisma.article.create({
                data: {
                    userId: user?.id,
                    description: description,
                    title: title
                },
                select: {
                    description: true
                }
            })
            return true
        } else if (Subscriber?.status === 'active' && Uses?.Articles.length < 50) {
            const data = await prisma.article.create({
                data: {
                    userId: user?.id,
                    description: description,
                    title: title
                },
                select: {
                    description: true
                }
            })
            return true
        } else {
            return false
        }
    }

    // return data
}