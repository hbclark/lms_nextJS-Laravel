"use client";
import { useFormState } from "react-dom";

import {updateBook} from "@/api/book";
 

export default function EditBookForm({ book }) {
  const [state, formAction] = useFormState(updateBook, {});

  return (
    <>
    {state?.message && (
        <div
          className="mt-10 bg-green-100 border border-green-400 text-green-700 text-xl px-4 py-3 rounded relative text-center"
          role="alert"
        >
          <strong className="font-bold">😃{state.message}</strong>
          <span className="ml-1 block sm:inline">{state.message};</span>
        </div>
      )}
      {state?.error && (
        <div
          className="mt-10 bg-red-100 border border-red-400 text-red-700 text-xl px-4 py-3 rounded relative text-center"
          role="alert"
        >
          <strong className="font-bold">😢{state.error}</strong>
          <span className="ml-1 block sm:inline">{state.error};</span>
        </div>
      )}
      <form
        action={formAction}
        className="w-6/12 mx-auto mt-10 h-100 p-10  border border-solid border-gray-400 rounded-xl shadow"
      >
        <h2 className="text-center text-3xl font-semibold leading-7">
          Edit Book
        </h2>
        
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm  sm:max-w-md">
                <input type="hidden" name="id" value={book.id} />
                <input
                  type="title"
                  name="title"
                  id="title"
                  autoComplete="title"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-green-600/30 sm:text-sm sm:leading-6"
                
                  defaultValue={book.title}
                
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="author"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Author
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="author"
                id="author"
                autoComplete="author"
                className="block w-full rounded-md border-0 py-1.5 pl-4  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-green-300 sm:text-sm sm:leading-6"
                required
                defaultValue={book.author}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="publisher"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
             Publisher
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="publisher"
                id="publisher"
                autoComplete="publisher"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                defaultValue={book.publisher}
              />
            </div>
          </div>
        </div>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="language"  className="mr-2">Choose a language:</label>
          <select name="language" id="language">
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Mandarin">Mandarin</option>
            <option value="Japanese">Japanese</option>
            <option value="Russian">Russian</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="category" >Choose a category:</label>
          <select name="category" id="category">
            <option value="Fiction">Fiction</option>
            <option value="Nonfiction">Nonfiction</option>
            <option value="Reference">Reference</option>
           
          </select>
        </div>
        </div>

        {state?.errors && (
          <ul className="mt-4 text-red-500 text-sm">
            {Object.entries(state.errors).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        )}

        <button
          href="/login"
          className="block mt-4 mx-auto text-center rounded-md bg-indigo-800 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </form>
    </>
  );
}
