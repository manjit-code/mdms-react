import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from 'recharts';

export default function ElectricityConsumptionOverviewGraph({url, title}) {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('day');
  const theme = useSelector(state => state.theme.colors);

  const chartData = {
    day: [
      { name: '00:00', consumption: 8 },
      { name: '04:00', consumption: 6 },
      { name: '08:00', consumption: 15 },
      { name: '12:00', consumption: 22 },
      { name: '16:00', consumption: 18 },
      { name: '20:00', consumption: 12 },
      { name: '24:00', consumption: 10 },
    ],
    week: [
      { name: 'Mon', consumption: 45 },
      { name: 'Tue', consumption: 52 },
      { name: 'Wed', consumption: 48 },
      { name: 'Thu', consumption: 55 },
      { name: 'Fri', consumption: 60 },
      { name: 'Sat', consumption: 35 },
      { name: 'Sun', consumption: 30 },
    ],
    month: [
      { name: 'Week 1', consumption: 180 },
      { name: 'Week 2', consumption: 220 },
      { name: 'Week 3', consumption: 240 },
      { name: 'Week 4', consumption: 210 },
    ],
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-semibold ${theme.text.primary} pl-4`}>
          {t('endUser.dashboard.electricity_consumption_overview')}
        </h2>

        <div className="flex space-x-2">
          {['day', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm border rounded ${
                timeRange === range
                  ? `${theme.button.primary.bg} ${theme.button.primary.text}`
                  : `${theme.background.card} ${theme.text.secondary} ${theme.border.primary}`
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData[timeRange]}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#f55814ff" 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}