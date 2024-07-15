"use client";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import loginAction from "@/actions/loginAction";
import Navbar from "@/components/Navbar/Navbar";
import { useSession } from "next-auth/react";


import { useRouter } from "next/navigation";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      type="submit"
      disabled={pending}
    >
      {pending ? "submitting..." : "Login"}
    </button>
  );
}
export default function Page() {
  const [state, formAction] = useFormState(loginAction, { errors: null });
  
  const { push } = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const {data:session,status} = useSession({
    required:false,
    onUnauthenticated(){}
    });
  
  useEffect(() => {
    if (status === "authenticated") {
      push("/dashboard");
      setIsLogin(true);
    }
  }, [status]);
 



  return (
    <>
      <Navbar />
      
        <form
          action={formAction}
          className="w-5/12 mx-auto mt-10 h-100 p-10  border border-solid border-gray-400 rounded-xl shadow"
        >
          <h2 className="text-center text-3xl font-semibold leading-7">
            Login
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-10  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4 ">
              <label
                htmlFor="Password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="Password"
                  autoComplete="Password"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#?])[A-Za-z\d!@#?]{8,15}$"
                  title="Password must contain 	8 to 15 characters in length,at least one uppercase letter, one lowercase letter, one number, and one special character e.g. ! @ # ?."
                  required
                />
              </div>
            </div>
          </div>
          {state.errors && (
            <ul className="mt-4 text-red-500 text-sm">
              {Object.entries(state.errors).map(([key, value]) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          )}

          <Submit />
        </form>
     
    </>
  );
}
