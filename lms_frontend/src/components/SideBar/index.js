"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { GrHistory } from "react-icons/gr";
import { TbUsers } from "react-icons/tb";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { BiSolidBookAdd } from "react-icons/bi";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function MenuButton({ handleClick }) {
  return (
    <button
      className="fixed top-2 left-3 block lg:hidden z-40 pr-3 pb-3"
      onClick={handleClick}
    >
      <IoMdMenu />
    </button>
  );
}

export default function Page({ className,role }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentPath = usePathname();
  
   

  const adminActions = [
    {
      name: "Home",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Users List",
      href: `/dashboard/user`,
      icon: TbUsers,
    },
    {
      name: "Add user",
      href: `/dashboard/user/add`,
      icon: AiOutlineUserAdd,
    },
    {
      name: "Books List",
      href: `/dashboard/book/list`,
      icon: MdOutlineLibraryBooks,
    },
    {
      name: "Add book",
      href: `/dashboard/book/add`,
      icon: BiSolidBookAdd ,
    },
  
  ];
  const userActions = [
    {
      name: "Home",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Borrow History",
      href: "/dashboard/user/borrow",
      icon: GrHistory,
    }, 
    
  ];

  const handleClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <MenuButton className="text-xl" handleClick={handleClick} />

      <div
        className={twMerge(
          clsx(
            "w-72 bg-blue-700 h-1vlh px-4 hidden lg:block ",
            isSidebarOpen && "block fixed top-0 left-0 z-20 h-screen"
          )
        )}
      >
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/">Logo</Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
            <ul role="list" className="-mx-2 space-y-1">
              {role ==="Admin" && <> {adminActions.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        currentPath === item.href
                          ? "bg-indigo-700 text-white"
                          : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          currentPath === item.href
                            ? "text-white"
                            : "text-indigo-200 group-hover:text-white",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}</>}
              
              {role ==="Member" && <> {userActions.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        currentPath === item.href
                          ? "bg-indigo-700 text-white"
                          : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          currentPath === item.href
                            ? "text-white"
                            : "text-indigo-200 group-hover:text-white",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}</>}
               
                
              </ul>
            </li>

            <li className="mt-auto fixed bottom-10">
              <Link
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
              >
                <Cog6ToothIcon
                  className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                  aria-hidden="true"
                />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
