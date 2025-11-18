import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';

export default function Dropdown({ items, onSelect, selectedIndex = 0 }) {
  const theme = useSelector(state => state.theme.colors);

  return (
    <Menu as="div" className={`relative ${theme.background.card} m-1`}>
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold inset-ring-1 inset-ring-white/5">
        {items[selectedIndex]}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>
      <MenuItems
        transition
        className={`absolute left-full top-0 ml-2 z-50 w-40 origin-top-left rounded-md shadow-lg ${theme.background.secondary} border ${theme.border.primary} focus:outline-none`}
      >
        {
          items.map((item, index) => (
            <MenuItem key={index}>
              {({ focus }) => (
                <button
                  onClick={() => onSelect(index)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    focus ? "bg-gray-200 text-black" : theme.text.primary
                  }`}
                >
                  {item}
                </button>
              )}
            </MenuItem>
          ))
        }
      </MenuItems>
    </Menu>
  )
}

