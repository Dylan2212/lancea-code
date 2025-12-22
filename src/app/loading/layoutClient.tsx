"use client";

import { createContext } from "react"
import { useSearchParams } from "next/navigation";

export const HandleContext = createContext<string>("");

export default function HandleLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) 
{
  const searchParams = useSearchParams()
  const handle = searchParams.get("handle")
  return (
    <HandleContext.Provider value={handle ?? ""}>
      {children}
    </HandleContext.Provider>
  );
}