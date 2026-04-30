"use client";
import { useState } from "react";
import { brandColors } from "@/src/businessRules";
import { Check } from "lucide-react"

type Props = {
  checkout: (priceId: string, mode: 'subscription' | 'payment') => Promise<void>
}

export default function MonthlyYearlyPricing ({ checkout }: Props) {
  const [yearly, setYearly] = useState(false);

  const monthlyPrice = {
    price: 6.99,
    id: "price_1SZxPZBfQy9tndTNJLEdKxlN"
  }

  const yearlyPrice = {
    price: 69.99,
    id: "price_1SZxPZBfQy9tndTNJLEdKxlN"
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 text-center">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className={!yearly ? `font-semibold text-[${brandColors.hover}]` : "text-gray-500"}>
          Monthly
        </span>

        <button
          onClick={() => setYearly(!yearly)}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              yearly ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>

        <span className={yearly ? `font-semibold text-[${brandColors.hover}]` : "text-gray-500"}>
          Yearly
        </span>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-2">Premium Plan</h2>

        <p className="text-4xl font-bold mb-4">
          {yearly ? `$${yearlyPrice.price}` : `$${monthlyPrice.price}`}
          <span className="text-base font-normal text-gray-500">
            {yearly ? "/yr" : "/mo"}
          </span>
        </p>

        <ul className="text-left space-y-2 mb-6 text-gray-700">
          <li className="flex gap-2"><Check className={`text-[${brandColors.main}]`}/> Custom Metadata</li>
          <li className="flex gap-2"><Check className={`text-[${brandColors.main}]`}/> Custom Domain</li>
          <li className="flex gap-2"><Check className={`text-[${brandColors.main}]`}/> Remove Lancrly Branding</li>
        </ul>

        <button onClick={() => checkout(yearly ? yearlyPrice.id : monthlyPrice.id, "subscription")} className={`w-full py-3 bg-[${brandColors.main}] text-white rounded-lg font-medium hover:bg-[${brandColors.hover}] transition-all duration-200 ease-in-out`}>
          Go Premium
        </button>
      </div>
    </div>
  );
}