import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ReusableLineChart({
  title = "",
  data = {},
  row,
  col,
  displayFilter = []
}) {
  const theme = useSelector(state => state.theme.colors);
  const [timeRange, setTimeRange] = useState(displayFilter[0] || "day");

  const activeData = data[timeRange] || [];

  // Dynamically find X-axis key if provided 'col' not present in current dataset
  const xKey = useMemo(() => {
    if (activeData.length === 0) return col;
    const firstItem = activeData[0];
    if (firstItem.hasOwnProperty(col)) return col;

    // pick the first string key other than 'row'
    const possibleKeys = Object.keys(firstItem).filter(k => k !== row);
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

        {displayFilter.length > 0 && (
          <div className="flex space-x-2">
            {displayFilter.map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm border rounded capitalize transition-all duration-200 ${
                  timeRange === range
                    ? `${theme.button.primary.bg} ${theme.button.primary.text}`
                    : `${theme.background.card} ${theme.text.secondary} ${theme.border.primary}`
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-64 -ml-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={row}
              stroke="#f55814"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
