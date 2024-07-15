import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
