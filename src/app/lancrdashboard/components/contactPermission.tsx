import React, { useState } from "react";

type MyProps = {
  value: string,
  onChange: (arg: string) => void
}

export default function ContactPermission({ value, onChange }: MyProps) {
  const [allowContact, setAllowContact] = useState(false);

  return (
    <div className="my-5 w-11/12 mx-auto
      lg:w-2/3
    ">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={allowContact}
          onChange={() => setAllowContact(!allowContact)}
          className="form-checkbox h-5 w-5 text-purple-600"
        />
        <span className="text-gray-700 font-medium">Allow me to contact you?</span>
      </label>

      {allowContact && (
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your email address"
          className="mt-3 w-full p-2 border border-gray-500 rounded-md focus:outline-purple-500"
        />
      )}
    </div>
  );
}