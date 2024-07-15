"use server";

import { redirect } from "next/navigation";
import {hashUserPassword} from "@/lib/hash"

import { revalidatePath } from "next/cache";

export default async function signupAccount(preState, formData) {
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  let password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const action = formData.get("action");
  const agreement = formData.get("agreement");

  const errors = {};
  
  const namePattern =/^[a-zA-Z]{1,20}$/;
  const firstNameResult = namePattern.test(firstName);
  if(!firstNameResult){
    errors.firstName = "First name must contain only letters";
  }
  const lastNameResult = namePattern.test(lastName);
  if(!lastNameResult){
    errors.lastName = "Last name must contain only letters";
  }

  
  if(agreement !== "agreement" && action !== "addUser")
    {
      errors.agreement = "You must agree to the terms and conditions";
    }
  
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#?])[A-Za-z\d!@#?]{8,15}$/;
  const result = regex.test(password);
  if(result === false){
    errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
  }

  if (password !== confirmPassword) {
    errors.password = "Passwords do not match";
    
  }
  password = hashUserPassword(password);

 

  try {
    const res = await fetch(`http://localhost:8000/api/users/${email}`);
    const user = await res.json();
    

    if (user.id) {
      errors.email = "Email already exists";
    }
  } catch (e) {
    
    return { errors: { email: "AN error" } };
  }

  if (Object.keys(errors).length > 0) {
    
    return { errors: errors };
  }
 

  try{
  const result = await fetch("http://localhost:8000/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,firstName,lastName,password }),
      }
    );}
    catch(e){
      return { errors: { email: "An error occurred" } };
    }
  
    revalidatePath("/dashboard/user");
  if (action === "addUser") {
    revalidatePath("/dashboard/user");
    return { message: `User ${firstName} ${lastName} added successfully` };
    
  } else {
    
  }
  
  redirect("/");
}
