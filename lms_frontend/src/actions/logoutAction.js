
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function LogoutAction() {
  await signOut();
}
