
import {getAllBooks} from "@/api/book";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {BooksItem} from "@/components";

import {redirect} from "next/navigation";

export default async function Page({}){
    let books = await getAllBooks();
    const session = await getServerSession(authOptions);
    
    const role = session.user.role;
    if(role !== "Admin"){
        redirect("/dashboard");
    }
    
    
    

    return (
        <div className="lg:mt-32 mt-48 px-10">
        <BooksItem books={books}  role={role}/>
        </div>
    )

}

