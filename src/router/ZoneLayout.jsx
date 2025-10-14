import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ZoneLayout() {
  return (
        <div style={{background:`${theme.background}`, display:'flex', flexDirection:'column'}}>
        {/* <Navbar/> */}
        <Outlet/>
        </div>
    )
}
