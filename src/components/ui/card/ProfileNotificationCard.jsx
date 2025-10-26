import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function NotificationSettings() {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.colors);
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div  className={`${theme.background.card} p-5 rounded-md h-auto flex flex-col items-center justify-center space-y-5 w-2/5`}>
      <h2 className={`text-lg font-medium mb-4 ${theme.text.primary}`}>
        {t('endUser.profile.notifications_from')}
      </h2>

      <div className="space-y-3 w-full">
        {/* Email Option */}
        <div className="flex flex-row justify-between">
          <span className={`text-sm ${theme.text.primary}`}>
            {t('endUser.profile.email')}
          </span>
          <button
            onClick={() => handleToggle('email')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.email
                ? 'bg-blue-600'
                : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.email ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* SMS Option */}
        <div className="flex items-center justify-between">
          <span className={`text-sm ${theme.text.primary}`}>
            {t('endUser.profile.sms')}
          </span>
          <button
            onClick={() => handleToggle('sms')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.sms
                ? 'bg-blue-600'
                : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.sms ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Push Option */}
        <div className="flex items-center justify-between">
          <span className={`text-sm ${theme.text.primary}`}>
            {t('endUser.profile.push')}
          </span>
          <button
            onClick={() => handleToggle('push')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.push
                ? 'bg-blue-600'
                : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.push ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      
      <button className={`${theme.button.action} p-3 rounded-lg`}>{t('endUser.profile.save_and_continue')}</button>
    </div>
  );
}