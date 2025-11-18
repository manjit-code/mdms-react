import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/header/Header'
import Footer from '../components/layout/footer/Footer'
import Sidebar from '../components/layout/sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export default function ProtectedLayout() {
  const theme = useSelector(state => state.theme.colors);
  const {t} = useTranslation();
   const items = [
    { title: t("endUser.sidebar.dashboard"), value: "dashboard" },
    { title: t("endUser.sidebar.bills_and_payments"), value: "bills_and_payments" },
    { title: t("endUser.sidebar.meter_data"), value: "meter_data" },
    { title: t("endUser.sidebar.alerts_and_notifications"), value: "alerts_and_notifications" },
    { title: t("endUser.sidebar.profile_and_settings"), value: "profile_and_settings" },
    { title: t("endUser.sidebar.logs"), value: "logs" },
  ];

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${theme.text.primary}`}>
      <Header />
      <div className={`flex flex-1 flex-row overflow-hidden`}>
        <Sidebar items={items} path='consumer'/>
        <div className={`flex-1 overflow-y-scroll no-scrollbar ${theme.background.secondary} px-10 py-5`}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}