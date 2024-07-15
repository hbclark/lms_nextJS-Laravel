import {getAllBooks} from "@/api/book";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {BooksItem} from "@/components";

export default async function Page(){
    let books = await getAllBooks();
    const session = await getServerSession(authOptions);
    const currentId = session.user.id;
    books=books.filter(book=>book.user_ids[0]=== currentId);
    
    

    return (
        <div className="lg:mt-32 mt-48 px-10">
        <BooksItem books={books} userId = {currentId}/>
        </div>
    )

}