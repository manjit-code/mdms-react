import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/header/Header'
import Footer from '../components/layout/footer/Footer'
import Sidebar from '../components/layout/sidebar/Sidebar'
import { useSelector } from 'react-redux'

export default function PublicLayout() {
  const theme = useSelector(state => state.theme.colors)
  return (
    <div style={{background:`${theme.background}`, display:'flex', flexDirection:'column'}}>
      <Header/>
      <div>
        <Sidebar/>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
