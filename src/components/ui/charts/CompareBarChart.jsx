import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  ComposedChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CompareBarChart({ title, dataByYear }) {
  const theme = useSelector((state) => state.theme.colors);
  const years = Object.keys(dataByYear).sort();
  const [selectedYearIndex, setSelectedYearIndex] = useState(years.length - 1);

  const currentYear = years[selectedYearIndex];
  const data = dataByYear[currentYear] || [];

  const isDark = theme.mode === "dark";
  const activeColor = isDark ? "#4f46e5" : "#2563eb";
  const inactiveColor = isDark ? "#ef4444" : "#dc2626";

  const handlePrevYear = () =>
    selectedYearIndex > 0 && setSelectedYearIndex((prev) => prev - 1);
  const handleNextYear = () =>
    selectedYearIndex < years.length - 1 && setSelectedYearIndex((prev) => prev + 1);

  return (
    <div className="w-full mt-10" style={{ minWidth: 0, minHeight: 300 }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className={`text-xl font-semibold ${theme.text.primary}`}>{title}</h1>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevYear}
            disabled={selectedYearIndex === 0}
            className={`p-2 rounded-lg border ${theme.border.primary} ${theme.text.action_hover} disabled:opacity-40`}
          >
            <ChevronLeft size={18} />
          </button>
          <div
            className={`${theme.background.card} px-4 py-1 rounded-lg border ${theme.border.primary} font-medium ${theme.text.primary}`}
          >
            {currentYear}
          </div>
          <button
            onClick={handleNextYear}
            disabled={selectedYearIndex === years.length - 1}
            className={`p-2 rounded-lg border ${theme.border.primary} ${theme.text.action_hover} disabled:opacity-40`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Chart Card */}
      <div
        className={`h-96 w-full rounded-xl shadow-lg p-6 ${theme.background.card} border ${theme.border.primary} flex flex-col justify-between`}
        style={{ minWidth: 0, minHeight: 380 }}
      >
        {/* Chart */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              barCategoryGap="25%"
            >
              <defs>
                <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeColor} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={activeColor} stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="inactiveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={inactiveColor} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={inactiveColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip formatter={(v) => [`${v} users`, "Count"]} />

              {/* Curve between bars */}
              <Area
                type="monotone"
                dataKey="count"
                stroke={activeColor}
                strokeWidth={3}
                fill="url(#activeGradient)"
              />

              {/* Bars */}
              <Bar
                dataKey="count"
                radius={[50, 50, 0, 0]}
                barSize={120}
                animationDuration={900}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.status === "Active" ? activeColor : inactiveColor}
                  />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Year Indicator */}
        <div className="flex justify-center items-center mt-4 mb-1">
          <span
            className={`text-sm ${theme.text.secondary} flex items-center gap-1`}
          >
            <span className="text-blue-500">◆</span> {currentYear}
          </span>
        </div>
      </div>
    </div>
  );
}