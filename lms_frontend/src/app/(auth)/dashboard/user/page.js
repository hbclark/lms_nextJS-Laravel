import { getAllUsers } from "@/api/user";

import {UsersListItem} from "@/components";
import {deleteUser} from "@/api/user";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import {redirect} from "next/navigation";


export default async function Page() {

  const session = await getServerSession(authOptions);
  const role = session.user.role;
  if(role !== "Admin"){
      redirect("/dashboard");
  }
  let users = await getAllUsers();
 

  
 
 


 
  return (
    <UsersListItem users={users} onDelete = {deleteUser}/>
  );
}
