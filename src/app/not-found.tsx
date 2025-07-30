'use client';

import Link from 'next/link';
import PlainHeader from './components/plainHeader';

export default function NotFound() {
  return (
    <div className='max-h-dvh min-h-dvh flex flex-col'>
      <PlainHeader/>
      <div className="flex flex-col items-center justify-center flex-1 mb-20 md:mb-10 lg:mb-20 px-4 text-center text-gray-800">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <p className="text-xl mb-2">Looks like this page doesn’t exist.</p>
        <p className="mb-6 text-gray-600">But don’t worry — you can head back home.</p>
        <Link
          href="/"
          className="px-6 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-500 hov-standrd transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}