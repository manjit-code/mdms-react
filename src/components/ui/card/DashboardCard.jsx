import React from 'react';
import { useSelector } from 'react-redux';
import { Clock } from 'lucide-react';

export default function DashboardCard({ title, value, componentPassed }) {
  const theme = useSelector(state => state.theme.colors);
  const mode = useSelector(state => state.theme.mode);
  const IconComponent = componentPassed || Clock;

  const hoverEffect = mode === "dark" ? "hover:bg-[#1f2937] hover:shadow-xl transition-all duration-300" : "hover:bg-gray-100 hover:shadow-md transition-all duration-300";
  return (
    <div className={`p-6 rounded-xl border shadow-sm ${hoverEffect} ${theme.background.card} ${theme.border.primary} text-center flex flex-col items-center h-[160px]`}>
      <div className="mb-3">
        <IconComponent className={`mx-auto ${theme.text.accent}`} size={26} />
      </div>

      <p className={`text-2xl font-bold ${theme.text.primary} mb-1`}>{value}</p>
      <h3 className={`text-sm font-medium ${theme.text.secondary}`}>
        {title}
      </h3>
    </div>
  );
}
