import React from 'react'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux';

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const theme = useSelector(state => state.theme.colors)
  
  const handleLanguageChange = (e) =>{
    i18n.changeLanguage(e.target.value)
    setSelectedLanguage(e.target.value)
  }

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className={`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-black inset-ring-1 inset-ring-white/5 hover:${theme.background.primary}/20 ${theme.text.primary}`}>
        {selectedLanguage}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className={` absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in ${theme.background.secondary}`}
      >
        <div className="py-1">
          <MenuItem>
            <button
              className={`block px-4 py-2 text-sm ${theme.text.primary} data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden`}
              value='hi'
              onClick={handleLanguageChange}
            >
              Hindi
            </button>
          </MenuItem>
          <MenuItem>
            <button className={`block px-4 py-2 text-sm ${theme.text.primary} data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden`}
              value='en' onClick={handleLanguageChange}>
              English
            </button>
          </MenuItem>
          <MenuItem>
            <button className={`block px-4 py-2 text-sm ${theme.text.primary} data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden`}
              value='fr' onClick={handleLanguageChange}>
              French
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
