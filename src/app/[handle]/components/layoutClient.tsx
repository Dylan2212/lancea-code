"use client";

import { createContext } from "react"
import { UserData } from "../page";

export const UserContext = createContext<Partial<UserData>>({});

export default function UserLayoutClient({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: UserData;
}) {
  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
}
