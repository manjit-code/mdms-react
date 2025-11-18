import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "../components/ui/form/LoginForm";
import ForgotPassword from "../components/ui/form/ForgotPassword";
import ProtectedLayout from "./ProtectedLayout";
import ZoneLayout from "./ZoneLayout";
import EnterpriseLayout from "./EnterpriseLayout";

// EndUser pages
import EndUserDashboard from "../pages/dashboard/EndUserDashboard";
import EndUserBillPayments from "../pages/billPyments/EndUserBillPayments";
import EndUserMeterData from "../pages/meter/EndUserMeterData";
import EndUserAlertNotification from "../pages/alertNotification/EndUserAlertNotification";
import EndUserProfileSetting from "../pages/profile/EndUserProfileSetting";
import EndUserLogs from "../pages/uncategorized/EndUserLogs";

// Zone pages
import ZoneUserDashboard from "../pages/dashboard/ZoneUserDashboard";
import ZoneUserMeterManagement from "../pages/meter/ZoneUserMeterManagement";
import ZoneUserUserManagement from "../pages/user/ZoneUserUserManagement";
import ZoneUserReportsAnalytics from "../pages/reports/ZoneUserReportsAnalytics";
import ZoneUserSettingNotification from "../pages/alertNotification/ZoneUserSettingNotification";

// Enterprise pages
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import AdminMeterManagement from "../pages/meter/AdminMeterManagement";
import AdminSettingConfiguration from "../pages/uncategorized/AdminSettingConfiguration";
import AdminUserRoleManagement from "../pages/user/AdminUserRoleManagement";
import AdminZoneManagement from "../pages/meter/AdminZoneManagement";
import AdminAuditLogs from "../pages/uncategorized/AdminAuditLogs";

// Denied page
import AccessDenied from "../components/ui/uncategorized/AccessDenied";

// Protected router
function ProtectedRoute({ children, allowedRole }) {
  const role = useSelector((state) => state.auth.currRole);

  if (!role) return <Navigate to="/" replace />;

  const loginTime = localStorage.getItem("loginTime");
  if (loginTime) {
    const diff = (Date.now() - parseInt(loginTime)) / (1000 * 60); // minutes difference
    if (diff > 60) {
      localStorage.removeItem("role");
      localStorage.removeItem("user_info");
      localStorage.removeItem("loginTime");
      return <Navigate to="/" replace />;
    }
  }

  if (role !== allowedRole) return <AccessDenied />;
  return children;
}

export default function RouterSetup() {
  const role = useSelector((state) => state.auth.currRole);

  return (
    <BrowserRouter>
      <Routes>
        {/* ---------------- PUBLIC ---------------- */}
        <Route
          path="/"
          element={
            role ? <Navigate to={`/${role}/dashboard`} replace /> : <LoginForm />
          }
        />
        <Route path="/forgot_password" element={<ForgotPassword />} />

        {/* ---------------- END USER ---------------- */}
        <Route
          path="consumer/*"
          element={
            <ProtectedRoute allowedRole="consumer">
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          {/* Default redirect */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<EndUserDashboard />} />
          <Route path="bills_and_payments" element={<EndUserBillPayments />} />
          <Route path="meter_data" element={<EndUserMeterData />} />
          <Route
            path="alerts_and_notifications"
            element={<EndUserAlertNotification />}
          />
          <Route
            path="profile_and_settings"
            element={<EndUserProfileSetting />}
          />
          <Route path="logs" element={<EndUserLogs />} />
        </Route>

        {/* ---------------- ZONE USER ---------------- */}
        <Route
          path="zone/*"
          element={
            <ProtectedRoute allowedRole="zone">
              <ZoneLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ZoneUserDashboard />} />
          <Route
            path="meter_management"
            element={<ZoneUserMeterManagement />}
          />
          <Route path="user_management" element={<ZoneUserUserManagement />} />
          <Route
            path="reports_analytics"
            element={<ZoneUserReportsAnalytics />}
          />
          <Route
            path="settings_notification"
            element={<ZoneUserSettingNotification />}
          />
        </Route>

        {/* ---------------- ENTERPRISE USER ---------------- */}
        <Route
          path="enterprise/*"
          element={
            <ProtectedRoute allowedRole="enterprise">
              <EnterpriseLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route
            path="meter_management"
            element={<AdminMeterManagement />}
          />
          <Route
            path="setting_configuration"
            element={<AdminSettingConfiguration />}
          />
          <Route
            path="user_role_management"
            element={<AdminUserRoleManagement />}
          />
          <Route path="zone_management" element={<AdminZoneManagement />} />
          <Route path="audit_logs" element={<AdminAuditLogs />} />
        </Route>

        {/* ---------------- FALLBACK ---------------- */}
        <Route path="*" element={<AccessDenied />} />
      </Routes>
    </BrowserRouter>
  );
}
