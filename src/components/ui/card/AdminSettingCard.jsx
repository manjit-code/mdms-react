import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function AdminSettingCard() {
  const theme = useSelector((state) => state.theme.colors);
  const { t } = useTranslation();

  const [dataRetention, setDataRetention] = useState("30");
  const [autoLogout, setAutoLogout] = useState("30");
  const [auditLogRetention, setAuditLogRetention] = useState("30");
  const [timezone, setTimezone] = useState("UTC+0");
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("INR");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t("enterprise.setting_configuration.save_changes"));
  };

  return (
    <div className={`w-full max-w-4xl mx-auto p-8 rounded-lg ${theme.background.card}`}>
      <div className="space-y-8">

        
        <div>
          <h3 className={`text-base font-semibold mb-2 ${theme.text.primary}`}>
            {t("enterprise.setting_configuration.policies_title")} :
          </h3>

          <p className={`text-sm mb-6 ${theme.text.secondary}`}>
            {t("enterprise.setting_configuration.policies_subtitle")}
          </p>

          <div className="grid grid-cols-2 gap-6">
            
            <div>
              <label className={`text-sm font-medium block mb-2 ${theme.text.primary}`}>
                {t("enterprise.setting_configuration.data_retention")}
              </label>
              <input
                type="number"
                value={dataRetention}
                onChange={(e) => setDataRetention(e.target.value)}
                className={`w-full px-3 py-3 rounded ${theme.input.base} ${theme.input.focus}`}
              />
            </div>

            <div>
              <label className={`text-sm font-medium block mb-2 ${theme.text.primary}`}>
                {t("enterprise.setting_configuration.auto_logout")}
              </label>
              <input
                type="number"
                value={autoLogout}
                onChange={(e) => setAutoLogout(e.target.value)}
                className={`w-full px-3 py-3 rounded ${theme.input.base} ${theme.input.focus}`}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className={`text-sm font-medium block mb-2 ${theme.text.primary}`}>
              {t("enterprise.setting_configuration.audit_retention")}
            </label>
            <div className="max-w-md">
              <input
                type="number"
                value={auditLogRetention}
                onChange={(e) => setAuditLogRetention(e.target.value)}
                className={`w-full px-3 py-3 rounded ${theme.input.base} ${theme.input.focus}`}
              />
            </div>
          </div>
        </div>

        
        <div>
          <h3 className={`text-base font-semibold mb-2 ${theme.text.primary}`}>
            {t("enterprise.setting_configuration.localization_title")} :
          </h3>

          <p className={`text-sm mb-6 ${theme.text.secondary}`}>
            {t("enterprise.setting_configuration.localization_subtitle")}
          </p>

          <div className="grid grid-cols-2 gap-6">
            
            <div>
              <label className={`text-sm font-medium block mb-2 ${theme.text.primary}`}>
                {t("enterprise.setting_configuration.timezone")}
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className={`w-full px-3 py-3 rounded cursor-pointer ${theme.input.base} ${theme.input.focus}`}
              >
                <option value="UTC+0">UTC+0</option>
                <option value="UTC+5:30">UTC+5:30</option>
                <option value="UTC-5">UTC-5</option>
                <option value="UTC+8">UTC+8</option>
              </select>
            </div>

            <div>
              <label className={`text-sm font-medium block mb-2 ${theme.text.primary}`}>
                {t("enterprise.setting_configuration.default_language")}
              </label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`w-full px-3 py-3 rounded ${theme.input.base} ${theme.input.focus}`}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className={`text-sm font-medium block mb-2 ${theme.text.primary}`}>
              {t("enterprise.setting_configuration.currency_format")}
            </label>
            <div className="max-w-md">
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`w-full px-3 py-3 rounded ${theme.input.base} ${theme.input.focus}`}
              />
            </div>
          </div>
        </div>

        {/* ---------- SAVE BUTTON ---------- */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleSubmit}
            className={`px-12 py-3 rounded-full text-sm font-medium transition-all duration-300 ${theme.button.action}`}
          >
            {t("enterprise.setting_configuration.save_changes")}
          </button>
        </div>
      </div>
    </div>
  );
}
