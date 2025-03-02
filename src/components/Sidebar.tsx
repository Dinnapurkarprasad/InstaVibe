import { currentUser } from "@clerk/nextjs/server"
import UnAuthneticatedSidebar from "./UnAuthneticatedSidebar";
import { getUserByClerkId } from "@/actions/user.action";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { MapPinIcon, MonitorCheck } from "lucide-react";


async function Sidebar() {

  const authUser =await currentUser();

    if(!authUser) return <UnAuthneticatedSidebar/>

    const user=await getUserByClerkId(authUser.id)

    if(!user) return null


    // vsvm;slvmslvmvlmsvdl;sLVms;vmsv';smdvsdv


    return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
           <div className="flex flex-col items-center justify-center">
           <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 rounded-full">
                <AvatarImage src={user.image || "/avatar.png"} className="rounded-full" />
              </Avatar>

              <div className="mt-4 space-y-3">
                <h3 className="font-semibold uppercase ml-3">{user.name}</h3>
                <p className="text-sm text-muted-foreground ml-2">{user.email}</p>
              </div>
            </Link>

            {user.bio && <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>}

            <div className="w-full border-b">
                <Separator className="my-4"/>
                  <div className=" flex justify-between">
                    <div>
                    <p className="text-medium text-center">{user._count.following}</p>
                    <p className="txt-xs text-muted-foreground">Following</p>
                    </div>
                    <div>
                    <p className="text-medium text-center">{user._count.followers}</p>
                    <p className="txt-xs text-muted-foreground">Followers</p>
                    </div>
                  </div>
                <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm mt-2">
                 <div className="flex items-center text-muted-foreground">
                  <MapPinIcon className="w-4 h-4 mr-2"/>
                  {user.location||"No Location"}
                  </div>
                 <div className="flex items-center text-muted-foreground">
                    <MonitorCheck className="w-4 h-4 mr-2"/>
                    {user.website?(<a href={`${user.website}`} className="hover:underline truncate" target="_blank">{user.website}</a>)
                    :("No Webiste")}
                 </div>
            </div>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default Sidebar

