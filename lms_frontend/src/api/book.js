"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export  async function getAllBooks() {
  const res = await fetch("http://localhost:8000/api/books",{cache:"no-store"});
  const books = await res.json();
  
  return books;
}


export async function findBooks(query) {
  //if query is empty, return all books
  if (!query) {
    return getAllBooks();
  }
  
  const res = await fetch(`http://localhost:8000/api/books/search/${query}`,{cache:"no-store"});
  const books = await res.json();
  
  return books;
}

export async function getBook(id){
  const res = await fetch(`http://localhost:8000/api/books/${id}`);
  const book = await res.json();
  return book;
}


export async function borrowBook(prevState,formData){
  const book_id = formData.get("book_id");
  const user_id = formData.get("user_id");
  const status ="onloan";
try{
  const res  = await fetch("http://localhost:8000/api/books/borrowBook",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({book_id,user_id,status})
  })

    revalidatePath("/dashboard");
    return {message:"Book borrowed successfully"};
    
  
}catch(e){
  console.log(e);
  return {errors:{borrow:"An error occured"}}}
}

export async function returnBook(prevState,formData){
  const book_id = formData.get("book_id");
  const user_id = formData.get("user_id");
  
  
  try{
    const res  = await fetch("http://localhost:8000/api/books/returnBook",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({book_id,user_id})
    })
  
      revalidatePath("/dashboard");
      const random = Math.random()
      return {message:"Book returned successfully"};
  }catch(e){
    console.log(e);
    return {errors:{borrow:"Failed to return book"}}}
  }

  export async function deleteBook(prevState,formData){
    const id = +formData.get("book_id");
    
    const status = formData.get("status");
    const title = formData.get("title");
   
    
    try{
      

      const res = await fetch(`http://localhost:8000/api/books/${id}`,{
        method:"DELETE"
      });

      revalidatePath("/dashboard");
      if(res.status === 404){
        return {error:"Book not found"};
      }
      if(res.status === 400){
        return {error:"Bad request"};
      }
      if(res.status ===200){
        revalidatePath("/dashboard");
        return {message:`${title} deleted successfully`};
      }
      
    }catch(e){
      console.log(e);
    }
  }

  export async function updateBook(prevState,formData){
    const title = formData.get("title");
    const author = formData.get("author");
    const publisher = formData.get("publisher");
    const id = formData.get("id");
    const language = formData.get("language");
    const category = formData.get("category");
    
    const alphaPattern = /^[a-zA-Z ]{1,30}$/; 
    const titleResult = alphaPattern.test(title);
    const authorResult = alphaPattern.test(author);
    const publisherResult = alphaPattern.test(publisher);
    const errors = {};
    if(titleResult === false){
      errors.title = "Title must contain only alphabets and length is 30";
    }
    if(authorResult === false){
      errors.author = "Author must contain only alphabets and length is 30";
    }
    if(publisherResult === false){
      errors.publisher = "Publisher must contain only alphabets and length is 30";
    }
    if(Object.keys(errors).length > 0){
      return {errors:errors};
    }
    try{
      const result = await fetch(`http://localhost:8000/api/books/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title,author,publisher,language,category }),
      }
      )
      
      if(result.status === 200){
        revalidatePath("/dashboard");
        return {message:`${title} updated successfully`};
      }
    }catch(e){
      console.log(e);
      return {error:"An error occured"};
    }

  }

  export async function addBook(prevState,formData){
    const title = formData.get("title");
    const author = formData.get("author");
    const publisher = formData.get("publisher");
    const language = formData.get("language");
    const category = formData.get("category");

    const alphaPattern = /^[a-zA-Z ]{1,30}$/; 
    const titleResult = alphaPattern.test(title);
    const authorResult = alphaPattern.test(author);
    const publisherResult = alphaPattern.test(publisher);
    const errors = {};
    if(titleResult === false){
      errors.title = "Title must contain only alphabets and length is 30";
    }
    if(authorResult === false){
      errors.author = "Author must contain only alphabets and length is 30";
    }
    if(publisherResult === false){
      errors.publisher = "Publisher must contain only alphabets and length is 30";
    }
    if(Object.keys(errors).length > 0){
      return {errors:errors};
    }
    
    try{
      const result = await fetch(`http://localhost:8000/api/books`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title,author,publisher,language,category }),
      }
      )
      if(result.status === 400){
        return {error:"Bad request"};
      }
      if(result.status === 500){
        return {error:"Internal server error"};
      } 
      if(result.status === 201){
        revalidatePath("/dashboard");
        return {message:`${title} added successfully`};
      }
    }catch(e){
      console.log(e);
      return {error:"An error occured"};
    }

  }