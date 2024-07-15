"use client"
import SignupForm from "@/components/SignupForm/SignupForm";
import Navbar from "@/components/Navbar/Navbar";
import {useSession} from "next-auth/react";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const {push} = useRouter();
  const {data:session,status} = useSession({
    required:false,
    onUnauthenticated(){}
    });
  
  useEffect(() => {
    if (status === "authenticated") {
      push("/dashboard");
      
    }
  }, [status]);
  return (
    <div className="mx-auto">
      <Navbar />
      <SignupForm />
    </div>
  );
}
