
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });
import { headers } from "next/headers";

import AskHelpButton from "@/components/AskHelpButton";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ params, children }) {
  const heads = headers();
  const pathName = heads.get("next-pathname ");
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider  session={session}>
        {children}
       
         </AuthProvider>
         <AskHelpButton />
        
        
      </body>
    </html>
  );
}