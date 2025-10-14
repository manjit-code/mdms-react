import React from 'react'
import { Outlet } from 'react-router-dom'

export default function EnterpriseLayout() {
  return (
    <div style={{background:`${theme.background}`, display:'flex', flexDirection:'column'}}>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
