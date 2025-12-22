import { Suspense } from "react";
import HandleLayoutClient from "./handleLayoutClient";

export const metadata = {
  title: "Loading... | Lancrly",
  description: "Hang tight — we’re getting everything ready for you on Lancrly.",
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {

  return (
    <Suspense fallback={null}>
      <HandleLayoutClient>
        {children}
      </HandleLayoutClient>
    </Suspense>
  )
}