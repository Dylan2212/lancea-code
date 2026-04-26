import React from "react";

export default function Footer({ handle }: { handle: string }) {
  return (
    <footer className="w-full py-10 text-center text-sm text-gray-400">
      <div className="w-11/12 mx-auto md:px-6">
        <div className="w-full h-px bg-gray-200 mb-6" />

        <p>
          © {new Date().getFullYear()} {handle}
        </p>
      </div>
    </footer>
  );
}