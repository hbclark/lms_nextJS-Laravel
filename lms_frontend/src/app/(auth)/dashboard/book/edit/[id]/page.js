import { getBook } from "@/api/book";

import { EditBookForm } from "@/components";
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

  let book = await getBook(id);
  

  return (
    <>
      <EditBookForm book={book} />
    </>
  );
}
