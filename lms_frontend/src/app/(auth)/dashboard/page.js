"use server"
import BookList from "./BookList";
import { SearchBook } from "@/components";


import { Suspense } from "react";

export default async function Page({ searchParams }) {
  const query = searchParams?.query || "";
  
 
  return (
    <div>
      <SearchBook />
      <Suspense fallback={<div>Loading...</div>}>
        <BookList query={query} />
      </Suspense>
    </div>
  );
}
