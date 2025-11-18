import React from 'react';
import { useSelector } from 'react-redux';
import { CirclePlus } from 'lucide-react';

export default function QuickActionButton({ icon: Icon = CirclePlus, label, onClick }) {
  const theme = useSelector(state => state.theme.colors);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      className={`flex flex-row items-center justify-center rounded-lg ${theme.text.primary} ${theme.button.secondary} 
                  transition-all duration-200 px-3 py-2 border-2 hover:scale-105 active:scale-95`}
    >
      <Icon size={18} />
      <span className="text-sm font-medium pl-2">{label}</span>
    </button>
  );
}