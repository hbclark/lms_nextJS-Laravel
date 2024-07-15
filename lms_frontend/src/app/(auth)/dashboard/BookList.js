import Image from "next/image";
import { findBooks } from "@/api/book";
import { BooksItem } from "@/components";

const BookList = async ({ query,sessionValue }) => {
  let books = await findBooks(query);
  
  
  
 

  return (
    <>
      {books.length === 0 && (
        <p className="flex justify-center items-center mt-[20%] text-3xl font-bold ">
          Sorry! No Book Found
        </p>
      )}
      <BooksItem books={books} sessionValue={sessionValue} />
    </>
  );
};

export default BookList;
