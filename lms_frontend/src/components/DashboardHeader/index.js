"use client"
import {signOut,useSession} from "next-auth/react";
import { useRouter } from "next/navigation";


export default function DashboardHeader({session}){
    const {push} = useRouter();
    async function handleClick(){
    await signOut();
    push("/login");
    }
   
   console.log(session);
    return (
        <div className="px-4 flex-1 flex-col ">
        <div className="fixed top-5 right-10 flex flex-col lg:flex-row gap-2">
        <p className="flex flex-col
        px-2 py-1 rounded-md tex-3xl font-semibold border border-slate-300/50">
          < span className="capitalize">{session.user.name}</span>
          <span>{session.user.email}</span></p>
        <button onClick={handleClick}
        className="bg-red-500 text-white px-4 py-2 rounded-lg  hover:bg-red-600"
        >Log Out</button> 

        
        </div>
        
      </div>
    )

}