"use server"

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "./user.action"
import { revalidatePath } from "next/cache"


export async function createPost(content: string, image: string) {
    try {
        const userId = await getDbUserId()
        if (!userId) {
            return { success: false, error: "User not found" };
          }

        if(!userId) return;

        const post = await prisma.post.create({
            data: {
                content,
                image,
                authorId: userId
            }
        })
        revalidatePath('/') //purge the cashe to homepage
        return { success: true, post }
    } catch (error) {
        console.log("failed to create a post", error)
        return { success: false, error: "Failed to create post" }
    }

}

