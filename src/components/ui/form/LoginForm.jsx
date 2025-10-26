// import { Check } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, Link, Navigate } from 'react-router-dom';

export default function LoginForm() {
  const { t, i18n } = useTranslation();
  const theme = useSelector(state => state.theme.colors);
  const navigate = useNavigate();

  const onSubmitClick = () =>{
    navigate('')
  }

  return (
    <div className="flex h-screen items-center content-center">
      <form action="login"  onSubmit={onSubmitClick()} className="flex justify-center flex-col text-center space-y-4 w-[50vw]">
        <div className={`text-lg`}>{t('login.title')}</div>
        <input
          type="text"
          name="email"
          placeholder={t('login.email')}
          className={`rounded-full px-4 py-2 w-full ${theme.button.secondary.bg}`}
        />
        <input
          type="password"
          name="password"
          placeholder={t('login.password')}
          className={`rounded-full px-4 py-2 w-full ${theme.button.secondary.bg}`}
        />
        <div className='flex justify-between p-2'>
          
        <div className="flex items-center justify-center">
          <input type="checkbox" className="mr-2" />
          <div>{t('login.remember_me')}</div>
        </div>
        <Link to='/fogot_password' className={ `text-right ${theme.button.secondary.text} hover:underline`}>
          {t('login.forgot_password')}
        </Link>
        </div>
        <div className='flex justify-center'>
          <button
          type="submit"
          className={`rounded-full ${theme.button.primary.bg} py-2 text-white w-2/5 `}
        >
          {t('login.login_button')}
        </button>
        </div>
      </form>
    </div>

  )
}
