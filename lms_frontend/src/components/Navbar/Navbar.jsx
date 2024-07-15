"use client";

import { useState, useId, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import LogoutAction from "@/actions/logoutAction";
import { IoCloseOutline } from "react-icons/io5";

import { CiLogin } from "react-icons/ci";
import { useSession,signOut } from "next-auth/react";


import clsx from "clsx";
import { redirect } from "next/dist/server/api-utils";

// type Props = {};

export default function Navbar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { data: session, status } = useSession({
    required: false,
    
    
  });

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/dashboard" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const id = useId();

  function handleLogout(){
    signOut();
   
  }


  return (
    <header>
      <nav className="flex justify-between px-8 items-center py-6 lg:px-40 xl:px-60">
        <div className="flex items-center gap-4">
          <section className="flex items-center gap-4">
            {/* Menu */}
            <FiMenu
              className="text-3xl cursor-pointer lg:hidden"
              onClick={() => {
                setIsSideMenuOpen(true);
              }}
            />
            {/* Logo */}
            <Link href={"/"} className="text-4xl font-mono">
              Logo
            </Link>
          </section>
          {navLinks.map((link, index) => (
            <Link
              href={link.href}
              key={id + index}
              className="hidden lg:block text-gray-400 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Sidebar Mobile Menu */}
        <div
          className={clsx(
            "fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-transform duration-300 ease-in-out z-40",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen w-56 p-8 gap-8 z-50 flex">
            <IoCloseOutline
              className="mt-0 mb-8 text-3xl cursor-pointer"
              onClick={() => {
                setIsSideMenuOpen(false);
              }}
            />
            {navLinks.map((link, index) => (
              <Link href={link.href} key={id + index} className="font-bold ">
                {link.label}
              </Link>
            ))}
          </section>
        </div>
        <section className="flex items-center gap-4">
          {/* Avatar img */}
          {status==="authenticated" ? (
           
              <button onClick = {handleLogout}>Sign out</button>
            
          ) : (
            <>
              <Link href="/login" className="-mr-3">
                Login
              </Link>
              <CiLogin />
              <Link href="/register">Register</Link>
            </>
          )}
        </section>
      </nav>
      <hr className="lg:mx-24" />
    </header>
  );
}
