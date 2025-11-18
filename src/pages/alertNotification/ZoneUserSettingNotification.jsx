import React, { useState, useEffect, useRef } from 'react'
import ZoneUserSettingsTab from '../uncategorized/ZoneUserSettingsTab';
import ProfileNotificationCard from '../../components/ui/card/ProfileNotificationCard';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function ZoneUserSettingNotification() {
  const [activeTab, setActiveTab] = useState("1");
  const theme = useSelector((state) => state.theme.colors);
  const { t } = useTranslation();

  // Refs for underline animation
  const wrapperRef = useRef(null);
  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);

  const [underline, setUnderline] = useState({ width: 0, left: 0 });

  // Update underline position and width
  const updateUnderline = () => {
    const wrapper = wrapperRef.current;
    const activeRef = activeTab === "1" ? tab1Ref.current : tab2Ref.current;

    if (!wrapper || !activeRef) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const activeRect = activeRef.getBoundingClientRect();

    setUnderline({
      width: activeRect.width,
      left: activeRect.left - wrapperRect.left,
    });
  };

  useEffect(() => {
    updateUnderline();
  }, [activeTab]);

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(updateUnderline, 50);
    return () => clearTimeout(timer);
  }, []);

  const renderComponent = () => {
    switch (activeTab) {
      case "1":
        return <ZoneUserSettingsTab theme={theme} />;
      case "2":
        return <ProfileNotificationCard />;
      default:
        return <div>{t("common.invalid_selection")}</div>;
    }
  };

  const baseTabClass = `
    px-4 pb-2 text-sm font-medium cursor-pointer 
    transition-all duration-200 ${theme.text.primary}
  `;

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex flex-col mb-5">
        <h1 className={`text-2xl font-bold mb-2 ${theme.text.primary}`}>
          {t('zoneUser.setting_and_notifications.user_management')}
        </h1>
        
        <p className={`text-sm mb-8 ${theme.text.secondary}`}>
          {t('zoneUser.setting_and_notifications.subtitle')}
        </p>

        <div
          ref={wrapperRef}
          className={`relative w-full border-b ${theme.border.primary} pb-4`}
        >
          <div className="flex flex-row justify-evenly w-full">
            <button
              ref={tab1Ref}
              className={baseTabClass}
              onClick={() => setActiveTab("1")}
            >
              {t('zoneUser.setting_and_notifications.settings')}
            </button>

            <button
              ref={tab2Ref}
              className={baseTabClass}
              onClick={() => setActiveTab("2")}
            >
              {t('zoneUser.setting_and_notifications.notification')}
            </button>
          </div>

          <span
            className={`${theme.text.accent} bg-current absolute bottom-0 h-[2px] transition-all duration-300 rounded-full`}
            style={{
              width: underline.width,
              left: underline.left,
            }}
          />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-start py-6">
        {renderComponent()}
      </div>
    </div>
  );
}