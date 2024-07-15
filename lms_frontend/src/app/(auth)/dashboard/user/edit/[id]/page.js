import { getUser } from "@/api/user";

import { EditUserForm } from "@/components";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import {redirect} from "next/navigation";

// edit user

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const role = session.user.role;
  if(role !== "Admin"){
      redirect("/dashboard");
  }
  const id = params.id;

  let user = await getUser(id);
  

  return (
    <>
      <EditUserForm user={user} />
    </>
  );
}
