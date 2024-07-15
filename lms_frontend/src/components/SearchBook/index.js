"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { PiPlaceholder } from "react-icons/pi";

export default function SearchBook() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (searchTerm) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    // replace the current url with the new search term in the query
    // without rendering the current pag e
    //
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex  max-w-full mt-4 mb-10 gap-x-4 items-center lg:gap-x-6">
      <form className="relative flex flex-1 flex-col lg:flex-row  py-3 max-w-100">
        <label htmlFor="bookName" className=" mb-2 lg:mb-0 translate-y-1 mx-3">
          Name:
        </label>
        <div className="leading-4 h-6 max-w-3xl  mb-6 lg:mb-0">
          <input
            id="bookName"
            name="name"
            type="text"
            className=" mb-4 lg:mb-0 rounded-md  w-full
      focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500
     border border-gray-300 shadow-sm  px-3 py-2"
            placeholder="Search book by name or author or publisher"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </form>

      {/* Separator */}
      {/* <div
          className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
          aria-hidden="true"
        /> */}

      {/* Profile dropdown */}
    </div>
  );
}
