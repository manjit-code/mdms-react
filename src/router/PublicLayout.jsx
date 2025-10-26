import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/header/Header'
import Footer from '../components/layout/footer/Footer'
import Sidebar from '../components/layout/sidebar/Sidebar'


export default function PublicLayout() {
  return (
    <div className={`min-h-screen`}>
      <Header/>
      <div className={`flex flex-row justify-center`}>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
