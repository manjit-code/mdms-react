import React from 'react';
import { useSelector } from 'react-redux';

export default function QuickActionButton({icon, label, onClickk}) {
    const theme = useSelector(state => state.theme.colors);
  return (
    <button onClick={onClickk} className={`flex flex-row items-center rounded-lg ${theme.button.secondary.bg} ${theme.text.primary} ${theme.button.secondary.hover} transition-colors duration-200 p-2`}>
        <span>{icon}</span>
        <span className='text-sm font-medium'>{label}</span>
    </button>
  )
}
