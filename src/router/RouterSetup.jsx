import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from './PublicLayout'
import LoginPage from '../pages/login/LoginPage'

// Import all the pages and provide routing from here 
export default function RouterSetup() {
  const role = "public"; // zone, enterprise
  return (
    <div>
      <BrowserRouter>
        <Routes>
            {/* {role === "public"} */}
            <Route path='' element={<PublicLayout/>}>
              <Route path='' element={<LoginPage/>} />
            </Route>
            
        </Routes>
      </BrowserRouter>
    </div>
  )
}
