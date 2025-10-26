import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from './PublicLayout'
import ProtectedLayout from './ProtectedLayout'
import LoginForm from '../components/ui/form/LoginForm'
import ForgotPassword from '../components/ui/form/ForgotPassword'
import ResetPassword from '../components/ui/form/ResetPassword'
import EndUserDashboard from '../pages/dashboard/EndUserDashboard'
import EndUserBillPayments from '../pages/billPyments/EndUserBillPayments'
import EndUserMeterData from '../pages/meter/EndUserMeterData'
import EndUserAlertNotification from '../pages/alertNotification/EndUserAlertNotification'
import EndUserProfileSetting from '../pages/profile/EndUserProfileSetting'
import EndUserLogs from '../pages/extra/EndUserLogs'

export default function RouterSetup() {
  const role = "public"; // zone, enterprise
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='' element={<ProtectedLayout/>}>
              <Route path='/dashboard' element={<EndUserDashboard/>}/>
              <Route path='bills_and_payments' element={<EndUserBillPayments/>}/>
              <Route path='meter_data' element={<EndUserMeterData/>}/>
              <Route path='alerts_and_notifications' element={<EndUserAlertNotification/>}/>
              <Route path='profile_and_settings' element={<EndUserProfileSetting/>} />
              <Route path='logs' element={<EndUserLogs/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
