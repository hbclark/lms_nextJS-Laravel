import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";
import {DashboardHeader} from "@/components";
import { revalidatePath } from "next/cache";
import { SearchBook, SideBar } from "@/components";

export default async function Page({ children}) {
  /*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const session = await getServerSession(authOptions);
  revalidatePath("/dashboard");
  
 
  if(!session){
    redirect("/login")
  }
  return (
    <>
     <DashboardHeader session={session}/> 
    
    <div className="flex mx-auto w-full">
      <SideBar role={session.user.role} />
     
      <div className="px-4 flex-1 flex-col ">
        <div className="px-4">{children}</div>
      </div>
    </div>
    </>
  );
}
