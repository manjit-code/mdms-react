import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { UserPlus } from "lucide-react";
import FloatingLabelInput from "../input/FloatingLabelInput";

export default function InviteUserForm() {
  const theme = useSelector(state => state.theme.colors);
  const {t} = useTranslation();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [zone, setZone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inviting User:", { email, role, zone });
    alert(`User invited!\nEmail: ${email}\nRole: ${role}\nZone: ${zone}`);
  };

  return (
    <div className={`w-full ${theme.background.card}`}>
      <p className={`text-sm mb-6 ${theme.text.secondary}`}>
        {t('enterprise.invite_user_form.dialog')}
      </p>
      <div>
        <FloatingLabelInput
          label={t('enterprise.invite_user_form.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FloatingLabelInput
          label={t('enterprise.invite_user_form.role')}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-6"
        />

        <FloatingLabelInput
          label={t('enterprise.invite_user_form.zone')}
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="mt-6"
        />

        <button
          onClick={handleSubmit}
          className={`mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 ${theme.button.action}`}
        >
          <UserPlus size={16} />
          {t('enterprise.invite_user_form.invite_user')}
        </button>
      </div>
    </div>
  );
}