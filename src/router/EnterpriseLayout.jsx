import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Header from '../components/layout/header/Header';
import Sidebar from '../components/layout/sidebar/Sidebar';
import { useTranslation } from 'react-i18next';
export default function EnterpriseLayout() {
  const theme = useSelector(state => state.theme.colors);
  const { t } = useTranslation();
 const items = [
    { title: t("enterprise.sidebar.dashboard"), value: "dashboard" },
    { title: t("enterprise.sidebar.zone_management"), value: "zone_management" },
    { title: t("enterprise.sidebar.meter_management"), value: "meter_management" },
    { title: t("enterprise.sidebar.user_role_management"), value: "user_role_management" },
    { title: t("enterprise.sidebar.audit_logs"), value: "audit_logs" },
    { title: t("enterprise.sidebar.setting_configuration"), value: "setting_configuration" },
  ];
  return (
    <div className={`h-screen flex flex-col overflow-hidden ${theme.text.primary}`}>
      <Header />
      <div className={`flex flex-1 flex-row overflow-hidden`}>
        <Sidebar items={items} path='enterprise' />
        <div className={`flex-1 overflow-y-scroll no-scrollbar ${theme.background.secondary} px-10 py-5`}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}