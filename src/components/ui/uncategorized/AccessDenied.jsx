import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearAuth } from '../../../redux/slices/AuthSlice';

export default function AccessDenied() {
  const navigate = useNavigate();
  const theme = useSelector(state => state.theme.colors);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("loginTime");
    navigate("/");
  };


  return (
    <div className={`flex h-screen items-center justify-center `}>
      <div className={`text-center ${theme.background.mini_card} rounded-md p-10`}>
        <h1 className={`text-5xl font-bold ${theme.text.primary} mb-4`}>
          {t('access_denied.access_denied')}
        </h1>
        <p className={`${theme.text.secondary} text-lg mb-8`}>
          {t('access_denied.message')}
        </p>
        <div className='flex flex-row justify-between'>
          <button
            onClick={() => navigate('/')}
            className={`px-8 py-3 ${theme.button.secondary} rounded-full font-small transition-all`}
          >
            {t('access_denied.go_back')}
          </button>
          <button

            onClick={handleLogout}
            className={`px-8 py-3 ${theme.button.secondary} rounded-full font-small transition-all`}
          >
            {t('access_denied.go_to_login')}
          </button>
        </div>
      </div>
    </div>
  );
}