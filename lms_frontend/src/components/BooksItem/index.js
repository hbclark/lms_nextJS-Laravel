"use client"
import Image from "next/image";
import { useId } from "react";
import {motion,useAnimate} from "framer-motion";
import {borrowBook,returnBook,deleteBook} from "@/api/book";
import {useFormState} from "react-dom";
import Link from "next/link";
import {useSession} from "next-auth/react";





export default  function BooksItem({ books,role}) {
  
const id = useId();
const {data:session} = useSession();
const userId = session?.user.id;
const [state,formAction] = useFormState(borrowBook,{});
const [returnState,returnAction] = useFormState(returnBook,{});
const [deleteState,deleteAction] = useFormState(deleteBook,{});


  return (
    <div>
       {books.length===0 && <h1 className="text-2xl font-bold text-center text-gray-800">No books available</h1>
      }
      {deleteState.message && <h1 className="text-2xl font-bold text-center text-gray-800">{deleteState.message}</h1>}
      {deleteState.error && <h1 className="text-2xl font-bold text-center text-gray-800">{deleteState.error}</h1>}
    <motion.ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(230px,340px))] grid-rows-[repeat(8,minmax(0,320px)]"
    
    >
     
      
      
      {books.length>0 &&(
        <> {books.map((book,i) => (
          <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.5,ease:"linear",delay:i*0.3}}
          
            key={book.id + id}
            className="grid p-4 border  border-solid border-gray-400 rounded-xl grid-rows-subgrid row-span-8
              gap-0 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
              "
          >
            <Image
              src="/images/book_1.png"
              alt={book.title}
              width={240}
              height={350}
              priority
            />
            <h1 className="mt-2 text-xl font-bold text-teal-700">
              <span className="capitalize">{book.title}</span>
            </h1>
            <p>
              <span className="font-semibold">Author: </span>
              <span className="text-gray-800 capitalize"> {book.author}</span>
            </p>
            <p>
              <span className="mr-1 font-semibold text-nowrap">Publisher:</span>
              <span className="capitalize">{book.publisher}</span>
            </p>
            <p>
              <span className="font-semibold text-nowrap mr-1 ">Language:</span>
              <span className="capitalize"> {book.language}</span>
            </p>
            <p>
              <span className="font-semibold text-nowrap mr-1 ">Category:</span>
              <span className="capitalize">{book.category}</span>
            </p>
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <span>{book.status[0]==='onloan'?<span className="text-md font-bold text-red-700 uppercase">onloan</span>
              :<span className="text-md font-bold uppercase text-green-600 ">available</span>}</span> {
                book.status[0] ==='onloan'?<span>Available after <span className="text-md text-green-500">{book.returned_date}</span></span>:(<div className={`${role==="Admin"?"hidden":"inline-block"}`}> <form action={formAction}>
                  <input type="hidden" name="book_id" value={book.id}/>
                  <input type="hidden" name="user_id" value={userId}/>
                  <button className="
                  px-3 py-2 border border-gray-100 rounded-md font-semibold bg-blue-500 hover:text-blue-500 hover:bg-white hover:border-blue-500/50 hover:border
                  ">Borrow</button>
                 </form></div>
               )
                }
            </div>
            {role==="Admin"&&(
              <div>
                {book.borrower.length>0 &&( <p>Lent by <span>{book.borrower[0]}</span> </p>)}
               
              <div className="flex justify-end gap-2 mt-2">
                 <Link href={`/dashboard/book/edit/${book.id}`} className="
                 bg-blue-500 px-3 py-2 border border-gray-100 rounded-md font-semibold hover:text-blue-500 hover:bg-white hover:border-blue-500/50 hover:border">Edit</Link>
               
               
             
              <form action={returnAction}>
                <input type="hidden" name="book_id" value={book.id}/>
                <input type="hidden" name="user_id" value={book.user_ids[0]}/>
               
                  <button className="bg-blue-500 px-3 py-2 border border-gray-100 rounded-md font-semibold hover:text-blue-500 hover:bg-white hover:border-blue-500/50 hover:border"
                
                >Return</button>
              </form>

              <form action={deleteAction}>
                <input type="hidden" name="book_id" value={book.id}/>
                <input type="hidden" name="user_id" value={book.user_ids[0]}/>
                <input type="hidden" name="status" value={book.status[0]}/>
                <input type="hidden" name="title" value={book.title}/>
                <button className="bg-red-500 px-3 py-2 border border-gray-100 rounded-md font-semibold hover:text-red-500 hover:bg-white hover:border-red-500/50 hover:border"
                
                >Delete</button>
                
               
              </form>
              </div>
              </div>
            )}
          </motion.li>
        ))}</>
      )}
     
    </motion.ul>
    </div>
  );
};


