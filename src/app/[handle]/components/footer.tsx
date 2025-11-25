import React from "react";

export default function Footer({ handle }: { handle: string }) {
  return (
    <footer className="w-full py-10 text-center text-sm text-gray-400">
      <div className="w-11/12 mx-auto px-6">
        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-6" />

        {/* Copyright */}
        <p>
          © {new Date().getFullYear()} {handle}
        </p>

        <a
          href="https://lancrly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex mt-3 items-center gap-1 px-3 py-1 rounded-2xl bg-white border-2 border-[#E9D5FF] text-gray-600 text-sm font-medium shadow-md transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-xl hover:scale-105"
        >
          <span className="text-gray-500">Built with</span>
          <span className="font-bold text-[#7E22CE] underline underline-offset-4">
            Lancrly
          </span>
        </a>
      </div>
    </footer>
  );
}