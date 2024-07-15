
// This action is used to authenticate a user and redirect them to the dashboard page if the credentials are correct. If the credentials are incorrect, an error message is displayed to the user.

import {signIn} from "next-auth/react";

import { redirect } from "next/navigation";

export default async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  let user;
 
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
   
    if(result.error){
      return { errors: { email: "Could not authenticate user, please check your credentials." } };
    }
    
    
  } catch (e) {
    
    return { errors: { email: "An error occurred" } };
  }

  // const isValidPassword = verifyPassword(user.password, password);
  // if (!isValidPassword) {
  //   return {
  //     errors: {
  //       password: "Could not authenticate user, please check your credentials.",
  //     },
  //   };
  // }

 
 redirect("/dashboard");
}
