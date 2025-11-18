import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'fr', name: 'French' },
  {code: 'od', name: 'Odia'},
  {code : 'kan', name: "Kannada"},
  {code: 'ben', name: "Bengali"}
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const theme = useSelector(state => state.theme.colors);

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setSelectedLanguage(languageCode);
  };

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton 
        className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold inset-ring-1 inset-ring-white/5 ${theme.background.primary || ''} ${theme.text.primary || ''}`}
      >
        {selectedLanguage}
        <ChevronDownIcon 
          aria-hidden="true" 
          className="-mr-1 size-5 text-gray-400" 
        />
      </MenuButton>

      <MenuItems
        transition
        className={`absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in ${theme.background.secondary}`}
      >
        <div className="py-1">
          {languages.map((language) => (
            <MenuItem key={language.code}>
              <button
                className={`block w-full px-4 py-2 text-sm text-left transition-colors ${
                  selectedLanguage === language.code 
                    ? `${theme.background.primary} ${theme.text.accent}` 
                    : `${theme.text.primary}`
                } data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden hover:bg-white/10`}
                onClick={() => handleLanguageChange(language.code)}
              >
                {language.name}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}