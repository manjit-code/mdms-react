import React from 'react';
import { useSelector } from 'react-redux';
import { Clock } from 'lucide-react';

export default function DashboardCard({ title, value, subtitle }) {
  const theme = useSelector(state => state.theme.colors);
  return (
    <div className={`p-6 rounded-lg shadow-md ${theme.background.card} ${theme.border.primary} text-center border w-[32%] m-3 ml-0 flex flex-col items-center`}>
      <div className="mb-2">
        <Clock className="mx-auto" size={24} />
      </div>
      <p className={`text-xl font-bold ${theme.text.primary} mb-1`}>{value}</p>
      <h3 className={`text-sm font-medium ${theme.text.secondary} mb-2`}>{title}</h3>
    </div>
  )
}