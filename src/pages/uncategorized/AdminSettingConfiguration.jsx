import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import AdminSettings from "../../components/ui/card/AdminSettingCard";
import ProfileNotificationCard from "../../components/ui/card/ProfileNotificationCard";

export default function AdminSettingConfiguration() {
  const theme = useSelector((state) => state.theme.colors);
  const { t } = useTranslation();

  const [currButton, setCurrentButton] = useState("1");

  // Refs to calculate underline
  const wrapperRef = useRef(null);
  const tab1 = useRef(null);
  const tab2 = useRef(null);

  const [underline, setUnderline] = useState({ width: 0, left: 0 });

  const updateUnderline = () => {
    const wrapper = wrapperRef.current;
    const activeRef = currButton === "1" ? tab1.current : tab2.current;

    if (!wrapper || !activeRef) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const activeRect = activeRef.getBoundingClientRect();

    setUnderline({
      width: activeRect.width,
      left: activeRect.left - wrapperRect.left,
    });
  };

  useEffect(updateUnderline, [currButton]);

  useEffect(() => {
    const t = setTimeout(updateUnderline, 50);
    return () => clearTimeout(t);
  }, []);

  const renderComponent = () => {
    switch (currButton) {
      case "1":
        return <AdminSettings />;
      case "2":
        return <ProfileNotificationCard />;
      default:
        return <div>{t('endUser.profile.invalid_selection')}</div>;
    }
  };

  const baseTab = `
    px-4 pb-2 text-sm font-medium cursor-pointer 
    transition-all duration-200 ${theme.text.primary}
  `;

  return (
    <div className="flex flex-col h-full">

      {/* ---------- HEADER ---------- */}
      <div className="flex flex-col mb-5">
        <h1 className={`text-2xl font-bold mb-2 ${theme.text.primary}`}>
          {t("enterprise.setting_configuration.title")}
        </h1>

        <p className={`text-sm mb-8 ${theme.text.secondary}`}>
          {t("enterprise.setting_configuration.subtitle")}
        </p>

        {/* ---------- TABS ---------- */}
        <div
          ref={wrapperRef}
          className={`relative w-full border-b ${theme.border.primary} pb-4`}
        >
          <div className="flex flex-row justify-evenly w-full">

            <button
              ref={tab1}
              className={baseTab}
              onClick={() => setCurrentButton("1")}
            >
              {t("enterprise.setting_configuration.tab_settings")}
            </button>

            <button
              ref={tab2}
              className={baseTab}
              onClick={() => setCurrentButton("2")}
            >
              {t("enterprise.setting_configuration.tab_notification")}
            </button>

          </div>

          {/* Underline */}
          <span
            className={`${theme.text.active} bg-current absolute bottom-0 h-[2px] transition-all duration-300 rounded-full`}
            style={{
              width: underline.width,
              left: underline.left,
            }}
          />
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="flex-1 flex justify-center items-start py-6">
        {renderComponent()}
      </div>
    </div>
  );
}
