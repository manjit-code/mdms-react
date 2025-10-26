// Header.jsx - Corrected
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../../utils/LanguageSelector';
import { ToggleLeft, ToggleRight, CircleUserRound, Bell } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../../redux/slices/ThemeSlice';

export default function Header() {
  const { t, i18n } = useTranslation();

  const theme = useSelector(state => state.theme);
  const isLoggedIn = true;
  const dispatch = useDispatch();

  const handleThemeButton = () => {
    dispatch(toggleTheme());
    console.log(`Curre Theme: ${theme.mode}, curr Color : ${theme.colors.background.primary} `);
  }
  
  return (
    <div className={`flex justify-between items-center ${theme.colors.background.primary} item-center`}>
      <div className={`${theme.colors.text.primary} pl-8 font-bold text-xl`}>{t('header.title')}</div>
      <div className='flex justify-around items-center p-5'>
        <div>{isLoggedIn ? <Bell size={25} className={`${theme.colors.text.primary} mr-5`}/> : <></>}</div>
        <div onClick={() => handleThemeButton()} className={`${theme.colors.text.primary} mr-5`}>
          {theme.mode === 'light' ? <ToggleLeft size={30} className={`${theme.colors.text.primary}`}/> : <ToggleRight size={30} className={`${theme.colors.text.primary}`}/>}
        </div>
        <LanguageSelector />
        <div className={`${theme.colors.text.primary} ml-5 pr-3`}>{isLoggedIn ? <CircleUserRound size={25} /> : <></>}</div>
      </div>
    </div>
  )
}