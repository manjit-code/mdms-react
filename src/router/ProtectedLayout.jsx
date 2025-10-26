import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/header/Header'
import Footer from '../components/layout/footer/Footer'
import Sidebar from '../components/layout/sidebar/Sidebar'
import { useSelector } from 'react-redux'

export default function ProtectedLayout() {
  const theme = useSelector(state => state.theme.colors)
  return (
    <div className={`h-screen flex flex-col overflow-hidden ${theme.text.primary}`}>
      <Header />
      <div className={`flex flex-1 flex-row overflow-hidden`}>
        <Sidebar />
        <div className={`flex-1 overflow-y-scroll no-scrollbar ${theme.background.secondary} px-10 py-5`}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}