// src/components/ui/charts/FilledLineChart.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FilledLineChart({
    title = "Energy Trend per Zone",
    dataByYear = {},
    xKey = "zone",
    yKey = "usage",
    color = "#4f46e5",
}) {
    const theme = useSelector((state) => state.theme.colors);

    // All years from keys in dataByYear
    const years = Object.keys(dataByYear).sort();
    const [selectedYearIndex, setSelectedYearIndex] = useState(years.length - 1); // Default latest
    const currentYear = years[selectedYearIndex];
    const data = dataByYear[currentYear] || [];

    const handlePrevYear = () => {
        if (selectedYearIndex > 0) setSelectedYearIndex((prev) => prev - 1);
    };

    const handleNextYear = () => {
        if (selectedYearIndex < years.length - 1) setSelectedYearIndex((prev) => prev + 1);
    };

    return (
        <div className="w-full mt-10">
            {/* Header with year navigation */}
            <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${theme.text.primary}`}>{title}</h2>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handlePrevYear}
                        disabled={selectedYearIndex === 0}
                        className={`p-2 rounded-lg border ${theme.border.primary} hover:bg-gray-100 transition-all duration-200 disabled:opacity-40`}
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <div
                        className={`${theme.background.card} px-4 py-1 rounded-lg border ${theme.border.primary} font-medium`}
                    >
                        {currentYear}
                    </div>

                    <button
                        onClick={handleNextYear}
                        disabled={selectedYearIndex === years.length - 1}
                        className={`p-2 rounded-lg border ${theme.border.primary} hover:bg-gray-100 transition-all duration-200 disabled:opacity-40`}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Chart */}
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme.background.card.includes("dark") ? "#1f2937" : "#fff",
                                borderRadius: "8px",
                                border: "none",
                                color: theme.text.primary.includes("white") ? "#fff" : "#111",
                            }}
                            formatter={(value, name, props) => [`${value} units`, props.payload.zone]}
                            labelFormatter={() => `Year ${currentYear}`}
                        />
                        <Area
                            type="monotone"
                            dataKey={yKey}
                            stroke={color}
                            fillOpacity={1}
                            fill="url(#colorUsage)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}