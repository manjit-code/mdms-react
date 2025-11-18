import React, { useState } from "react";
import { useSelector } from "react-redux";
import ThresholdSliderCard from "../../components/ui/card/ThresholdSliderCard";
import { useTranslation } from "react-i18next";

export default function ZoneUserSettingsTab() {
  const theme = useSelector((state) => state.theme.colors);
  const {t} = useTranslation()

  // Local state for slider values
  const [thresholds, setThresholds] = useState({
    highConsumption: 400,
    lowConsumption: 200,
    abnormalFrequency: 4,
    inactiveDay: t('zoneUser.setting_and_notifications.sunday'),
  });

  // Handlers
  const handleChange = (key, newValue) => {
    setThresholds((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleSave = () => {
    console.log("Saved thresholds:", thresholds);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <h2 className={`text-lg font-semibold ${theme.text.primary} mb-2`}>
          {t('zoneUser.setting_and_notifications.alert_threshold')}
        </h2>
        <p className={`${theme.text.secondary} mb-6`}>
          {t('zoneUser.setting_and_notifications.alert_subtitle')}
        </p>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <ThresholdSliderCard title={t('zoneUser.setting_and_notifications.high_consumption')} minvalue={0} maxvalue={1000} currValue={300} />
          <ThresholdSliderCard title={t('zoneUser.setting_and_notifications.low_consumption')} minvalue={0} maxvalue={1000} currValue={400} />
          <ThresholdSliderCard title={t('zoneUser.setting_and_notifications.abnormal_reading')} minvalue={0} maxvalue={10} currValue={6}/>

          <div
            className={`${theme.background.card} ${theme.border.primary} border rounded-2xl shadow-md p-6 w-full h-full transition-all duration-300 mt-4`}
          >
            <h2 className={`font-semibold mb-4 ${theme.text.primary}`}>
              {t('zoneUser.setting_and_notifications.inactive_meters')}
            </h2>

            <div className="flex flex-col">
              <label
                htmlFor="inactiveDay"
                className={`text-sm mb-1 ${theme.text.secondary}`}
              >
                {t('zoneUser.setting_and_notifications.day')}
              </label>
              <input
                id="inactiveDay"
                type="text"
                value={thresholds.inactiveDay}
                readOnly
                className={`w-full rounded-lg px-3 py-2 ${theme.input.base} ${theme.input.focus}`}
              />
            </div>
          </div>

        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSave}
          className={`px-6 py-3 rounded-full font-medium shadow-md transition-colors duration-300 ${theme.button.action}`}
        >
          {t('zoneUser.setting_and_notifications.save_and_continue')}
        </button>
      </div>
    </div>
  );
}
