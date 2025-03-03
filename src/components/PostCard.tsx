"use client"

import { createComment, getPosts, toggleLike } from "@/actions/post.action";
import { deletePost, getDbUserId } from "@/actions/user.action";
import { prisma } from "@/lib/prisma";
import { useUser } from "@clerk/nextjs";
import { Content } from "@radix-ui/react-dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent } from "./ui/card";

type Posts=Awaited<ReturnType<typeof getPosts>>
type Post=Posts[number]

function PostCard({post,dbUserId}:{post:Post;dbUserId:string|null}){

  const {user}=useUser();
  const [newComment,setNewComment]=useState("")
  const [isCommenting,setIsCommenting]=useState(false)
  const [isLiking,setIsLiking]=useState(false)
  const [isDeleting,setIsDeleting]=useState(false)
  const [hasLiked,setHasLiked]=useState(post.likes.some(like=>like.userId === dbUserId))
  const [tobeLikes,SetTobeLikes]=useState(post._count.likes)

  const handleLikes=async()=>{

    if(isLiking) return

    try {
      setIsLiking(true)
      setHasLiked(prev=>!prev)
      SetTobeLikes(prev=>prev+(hasLiked?-1:1))
      await toggleLike(post.id)

    } catch (error) {
      SetTobeLikes(post._count.likes)
      setHasLiked(post.likes.some(like=>like.userId === dbUserId))
    }
    finally{
      setIsLiking(false)
    }
  }

  const handleAddComment=async()=>{
   if(!newComment.trim()||isCommenting)return;

   try {
    setIsCommenting(true);

    const result=await createComment(post.id,newComment);

      if(result?.success){
        toast.success("You Commented on this post")
        setNewComment("");
      }
    }
    catch(error) {
    toast.error("Falied to add comment")
    }
    finally{
      setIsCommenting(false)
    }
   } 

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      if (result?.success) {
        toast.success("Post Deleted Successfully")
      }
      else throw new Error(result.error)
    }
    catch (error) {
      toast.error("Falied to delete Post")
    }
  } 

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
           <div className="">
                <div></div>

           </div>
      </CardContent>

    </Card>
  )
}
export default PostCard