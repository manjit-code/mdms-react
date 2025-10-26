import React from "react";
import { useSelector } from "react-redux";

export default function FloatingLabelInput({ label, value, onChange, type = "text" }) {
  const theme = useSelector((state) => state.theme.colors);
  const isFilled = value && value.length > 0;

  return (
    <div className="relative w-full mt-6">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`
          w-full rounded-md px-3 pt-6 pb-2 text-sm border
          ${theme.input.base} ${theme.input.focus} ${theme.border.input}
          ${theme.text.primary}
          outline-none focus:ring-2 focus:ring-opacity-50
        `}
      />

      {/* Label - Always floated when there's a value */}
      <label
        className={`
          absolute left-3 transition-all duration-200 pointer-events-none z-10
          ${isFilled
            ? `top-0 -translate-y-1/2 text-xs ${theme.background.card} px-1`
            : 'top-3.5 text-sm text-gray-500'
          }
          focus-within:top-0 focus-within:-translate-y-1/2 focus-within:text-xs focus-within:bg-white focus-within:px-1
        `}
      >
        {label}
      </label>
    </div>
  );
}