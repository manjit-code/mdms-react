import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CirclePlus } from "lucide-react";
import FloatingLabelInput from "../input/FloatingLabelInput";

export default function AddZoneForm() {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.colors);

  const [zoneName, setZoneName] = useState("");
  const [admin, setAdmin] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      zoneName,
      admin,
      location,
      description,
    });
  };

  return (
    <div
      className={`max-w-md mx-auto mt-4 p-6 rounded-2xl shadow-lg ${theme.background.card}`}
    >
      <h2 className={`text-xl font-semibold mb-1 ${theme.text.primary}`}>
        {t("enterprise.zone_management.add_zone")}
      </h2>
      <p className={`text-sm mb-6 ${theme.text.secondary}`}>
        {t("enterprise.zone_management.add_zone_title")}
      </p>

      <form onSubmit={handleSubmit}>
        <FloatingLabelInput
          label={t("enterprise.zone_management.zone_name")}
          value={zoneName}
          onChange={(e) => setZoneName(e.target.value)}
        />

        <div className="relative w-full mt-6">
          <select
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            className={`
              w-full rounded-md px-3 pt-6 pb-2 text-sm border appearance-none
              ${theme.input.base} ${theme.input.focus} ${theme.border.input}
              ${theme.text.primary}
              outline-none focus:ring-2 focus:ring-opacity-50 bg-transparent
            `}
          >
            <option value="" disabled hidden></option>
            <option value="axys">Axys</option>
            <option value="ravi">Ravi</option>
            <option value="meera">Meera</option>
          </select>

          <label
            className={`
              absolute left-3 transition-all duration-200 pointer-events-none z-10
              ${admin
                ? `top-0 -translate-y-1/2 text-xs ${theme.background.card} px-1`
                : "top-3.5 text-sm text-gray-500"}
              focus-within:top-0 focus-within:-translate-y-1/2 focus-within:text-xs
              focus-within:bg-white focus-within:px-1
            `}
          >
            {t("enterprise.zone_management.admin")}
          </label>
        </div>

        <FloatingLabelInput
          label={t("enterprise.zone_management.address_pincode")}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <FloatingLabelInput
          label={t("enterprise.zone_management.description_here")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-full 
            text-white text-sm font-medium transition-all duration-300 
            bg-black hover:bg-gray-900 active:scale-[0.98]
            focus:ring-2 focus:ring-offset-1 focus:ring-black`}
        >
          <CirclePlus size={16} />
          {t("enterprise.zone_management.add_zone")}
        </button>
      </form>
    </div>
  );
}