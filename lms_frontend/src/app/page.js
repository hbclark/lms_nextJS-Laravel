import Image from "next/image";
import { Navbar } from "../components";
import { getAllBooks } from "@/api/book";
import { Suspense } from "react";

async function Books() {
  const books = await getAllBooks();
  

  return (
    <div className="px-20">
      <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(230px,1fr))] grid-rows-[repeat(6,minmax(0,300px)]">
        {books.map((book) => (
          <li
            key={book._id}
            className="grid p-4 border  border-solid border-gray-400 rounded-xl grid-rows-subgrid row-span-6
            gap-0
            "
          >
            <Image
              src={"/images/book_1.png"}
              alt={book.title}
              width={200}
              height={300}
              priority
              
            />
            <h1 className="text-xl font-bold text-teal-700">{book.title}</h1>
            <p>{book.author}</p>
            <p>{book.publisher} </p>
            <p>{book.language}</p>
            <p>{book.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Books />
      </Suspense>
    </div>
  );
}
