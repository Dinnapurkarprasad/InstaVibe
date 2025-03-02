import { getRandomUser } from "@/actions/user.action"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import FollowButton from "./FollowButton"

async function WhoToFollow() {

    const users=await getRandomUser()
    if(users.length===0)return null


  return (
    <Card>
     <CardHeader>
           <CardTitle> 🧐 You May Know Them !</CardTitle>
     </CardHeader>
     <CardContent>
           <div className="space-y-4">
            {users.map((user)=>
            (
              <div key={user.id} className="flex gap-2 items-center justify-between">                   
                <div className="flex items-center gap-3">
                    <Link href={`/profile/${user.username}`}>
                          <Avatar>
                            <AvatarImage src={user.image ?? "user"} className="w-10 h-10 rounded-full"/>
                          </Avatar>
                    </Link>

                    <div className="text-sm">
                        <Link href={"`/profile/${user.username}`"} className="font-medium cursor-pointer">
                        {user.name}
                        </Link>
                        <p className="text-muted-foreground">@{user.username}</p>
                        <p className="text-muted-foreground">Followers {user._count.followers}</p>
                    </div>
                </div>
                <div>
                    <FollowButton userId={user.id} userName={user.name || "Anonymous"} />
                </div>
              </div>
            ))}

           </div>
     </CardContent>
    </Card>
  )
}

export default WhoToFollow




//  