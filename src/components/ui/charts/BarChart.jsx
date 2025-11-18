import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ReusableBarChart({
    title = "",
    data = {},
    row,
    col
}) {
    const theme = useSelector((state) => state.theme.colors);
    const [timeRange, setTimeRange] = useState("day");
    const activeData = data[timeRange] || [];

    // Dynamically determine the X-axis key if the provided 'col' is missing
    const xKey = useMemo(() => {
        if (activeData.length === 0) return col;
        const firstItem = activeData[0];
        if (firstItem.hasOwnProperty(col)) return col;
        const possibleKeys = Object.keys(firstItem).filter((k) => k !== row);
        return possibleKeys[0] || col;
    }, [activeData, col, row]);

    return (
        <div className="w-full">

            <div className="flex justify-between items-center mb-6">
                {title && (
                    <h2 className={`text-xl font-semibold ${theme.text.primary}`}>
                        {title}
                    </h2>
                )}
            </div>


            <div className="h-72 -ml-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey={row}
                            fill="#8884d8"
                            barSize={80}
                            radius={[10, 10, 0, 0]} // rounded top corners
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
