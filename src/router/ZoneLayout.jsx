import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Header from '../components/layout/header/Header';
import Sidebar from '../components/layout/sidebar/Sidebar';
import { useTranslation } from 'react-i18next';
export default function ZoneLayout() {
  const theme = useSelector(state => state.theme.colors);
  const { t } = useTranslation();
 const items = [
    { title: t("zoneUser.sidebar.dashborad"), value: "dashboard" },
    { title: t("zoneUser.sidebar.meter_management"), value: "meter_management" },
    { title: t("zoneUser.sidebar.user_management"), value: "user_management" },
    { title: t("zoneUser.sidebar.reports_analytics"), value: "reports_analytics" },
    { title: t("zoneUser.sidebar.settings_notification"), value: "settings_notification" },
  ];
  return (
    <div className={`h-screen flex flex-col overflow-hidden ${theme.text.primary}`}>
      <Header />
      <div className={`flex flex-1 flex-row overflow-hidden`}>
        <Sidebar items={items} path='zone' />
        <div className={`flex-1 overflow-y-scroll no-scrollbar ${theme.background.secondary} px-10 py-5`}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
