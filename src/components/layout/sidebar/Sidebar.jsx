import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const theme = useSelector(state => state.theme.colors);
  const [highlight, setHighlight] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    const val = e.target.value;
    console.log(val)
    setHighlight(val);
    navigate(`/${val}`);
  }
  return (
    <div className={`flex justify-start flex-col h-screen ${theme.background.sidebar} ${theme.text.primary} pl-5 w-1/5 justify-normal`}>
      <button className={`text-left p-3 ${highlight === 'dashboard' ? `font-bold` : ''}`} value='dashboard' onClick={handleButtonClick}>{t('sidebar.dashboard')}</button>
      <button className={`text-left p-3 ${highlight === 'bills_and_payments' ? `font-bold` : ''}`} value='bills_and_payments' onClick={handleButtonClick}>{t('sidebar.bills_and_payments')}</button>
      <button className={`text-left p-3 ${highlight === 'meter_data' ? `font-bold` : ''}`} value='meter_data' onClick={handleButtonClick}>{t('sidebar.meter_data')}</button>
      <button className={`text-left p-3 ${highlight === 'alerts_and_notifications' ? `font-bold` : ''}`} value='alerts_and_notifications' onClick={handleButtonClick}>{t('sidebar.alerts_and_notifications')}</button>
      <button className={`text-left p-3 ${highlight === 'profile_and_settings' ? `font-bold` : ''}`} value='profile_and_settings' onClick={handleButtonClick}>{t('sidebar.profile_and_settings')}</button>
      <button className={`text-left p-3 ${highlight === 'logs' ? `font-bold` : ''}`} value='logs' onClick={handleButtonClick}>{t('sidebar.logs')}</button>
    </div>
  )
}
