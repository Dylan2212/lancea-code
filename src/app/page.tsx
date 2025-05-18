import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="w-full flex justify-around h-screen items-center">
        <Link className="border px-2 py-1" href={"/"}>Get Started</Link>
        <Link className="border px-2 py-1" href={"/"}>Log In</Link>
      </main>
    </>
  );
}
