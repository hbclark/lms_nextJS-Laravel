"use server";

import { revalidatePath } from "next/cache";
import {redirect} from "next/navigation";
import { hashUserPassword } from "@/lib/hash";




export async function getAllUsers() {
  try {
    
    const res = await fetch("http://localhost:8000/api/users");
    const users = await res.json();

    return users;
  } catch (e) {
    console.log("Error in getAllUsers", e);
  }
}

export async function getUser(id) {
  try {
    

    const res = await fetch(`http://localhost:8000/api/users/${id}`);
    const user = await res.json();

    return user;
  } catch (e) {
    console.log("Error in getUser", e);
  }
}

export async function updateUser(prevState,formData) {
  try {
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  let password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const id = formData.get("id");
  

  const errors = {};
  

  if (password.length < 6 || confirmPassword.length < 6) {
    errors.passwordLength = "Password must be at least 6 characters";
  }

  if (password !== confirmPassword) {
    errors.password = "Passwords do not match";
    
  }
  password = hashUserPassword(password);

  console.log(`hashed password ${password}`)
  console.log(JSON.stringify({ email,firstName,lastName,password }));

  try {
    const result = await fetch(`http://localhost:8000/api/users/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({firstName,lastName,password }),
    }
    )

    
    

    if (result.status === 404) {
      return { errors: { email: "User not found" } };
      
    }
    if (result.status === 400) {
      return { errors: { email: "Bad request" } };
    }
    if (result.status === 500) {
      return { errors: { email: "Internal server error" } };
    }
    revalidatePath("/dashboard/user");
     
    

  } catch (e) {
    console.log(e);
    return { errors: { email: "AN error" } };
  }

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return { errors: errors };
  }
 
  return { success: `User ${firstName} ${lastName} updated successfully`};
    
  } catch (e) {}
}

export async function deleteUser(prevState,formData) {
  // id = id.toString();
  const id = formData.get("id");
  console.log(id);
  
  
  try {
    const resUser = await fetch(`http://localhost:8000/api/users/${id}`);
    const user = await resUser.json();
    if(user.memberType === "Admin"){
      return ({error:"Cannot delete admin user"});
    }

    const res = await fetch(`http://localhost:8000/api/users/${id}`, {
      method: "DELETE",
    });
    if (res.status === 404) {
      return { error: "User not found" };
    }
    if (res.status === 400) {
      return { error: "Bad request" };
    }
    if (res.status === 500) {
      return { error: "Internal server error" };
    }
    revalidatePath("/dashboard/user");
    const name = user.firstName + " " + user.lastName;
  
    return ({ success: `User ${name} deleted successfully` });
  } catch (e) {
    console.log(e);
    return { error: "An error" };
  }
}
