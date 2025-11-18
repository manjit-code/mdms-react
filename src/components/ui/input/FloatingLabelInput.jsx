import React, {useState} from 'react'
import { useSelector } from 'react-redux';

export default function FloatingLabelInput({ label, value, onChange, placeholder, className = "" }) {
  const theme = useSelector(state => state.theme.colors);
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg ${theme.input.base} ${theme.input.focus} transition-all duration-200 outline-none`}
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFocused || hasValue
            ? '-top-2 text-xs bg-white dark:bg-slate-700 px-1 text-blue-600 dark:text-indigo-400'
            : 'top-3 text-sm text-gray-400'
        }`}
      >
        {label}
      </label>
    </div>
  );
}