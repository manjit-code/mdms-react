import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function ProfileNotificationCard() {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme?.colors) || {};

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationTypes = ['email', 'sms', 'push'];

  return (
    <div
      className={`${theme.background.card} p-5 rounded-lg shadow-md flex flex-col items-center space-y-5 w-full sm:w-2/5`}
    >
      <h2 className={`text-lg font-semibold ${theme?.text?.primary || 'text-gray-900'}`}>
        {t('endUser.profile.notifications_from')}
      </h2>

      {notificationTypes.map((type) => (
        <div key={type} className="flex justify-between w-full">
          <span className={`${theme?.text?.primary || 'text-gray-800'} text-sm capitalize`}>
            {t(`endUser.profile.${type}`)}
          </span>
          <button
            onClick={() => handleToggle(type)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications[type] ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications[type] ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      ))}

      <button
        className={`mt-3 px-5 py-2 rounded-lg text-sm font-medium transition ${
          theme?.button?.action ?? 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {t('endUser.profile.save_and_continue')}
      </button>
    </div>
  );
}
