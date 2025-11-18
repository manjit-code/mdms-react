import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Upload, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ReusableLineChart from '../../components/ui/charts/LineChart';
import ReusableBarChart from '../../components/ui/charts/BarChart';
import Dropdown from '../../components/ui/uncategorized/Dropdown';
import TableComponent from '../../components/ui/table/TableComponent';
import QuickActionButton from '../../components/ui/button/QuickActionButton';

export default function ZoneUserReportsAnalytics() {
  const { t } = useTranslation();
  const theme = useSelector(state => state.theme.colors);

  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchText, setSearchText] = useState("");

  // Chart dummy data
  const dummyData = {
    day: [
      { time: '00:00', zone: 'Mangalore', consumption: 8 },
      { time: '04:00', zone: 'Bejai', consumption: 6 },
      { time: '08:00', zone: 'Pumpwell', consumption: 15 },
      { time: '12:00', zone: 'PVS', consumption: 22 },
      { time: '16:00', zone: 'Kadri', consumption: 18 },
      { time: '20:00', zone: 'Kulai', consumption: 12 },
    ],
    week: [
      { day: 'Mon', zone: 'Mangalore', consumption: 45 },
      { day: 'Tue', zone: 'Bejai', consumption: 52 },
      { day: 'Wed', zone: 'Pumpwell', consumption: 48 },
      { day: 'Thu', zone: 'PVS', consumption: 55 },
      { day: 'Fri', zone: 'Kadri', consumption: 42 },
      { day: 'Sat', zone: 'Kulai', consumption: 38 },
    ],
    month: [
      { week: 'Week 1', zone: 'Mangalore', consumption: 180 },
      { week: 'Week 2', zone: 'Bejai', consumption: 220 },
      { week: 'Week 3', zone: 'Pumpwell', consumption: 240 },
      { week: 'Week 4', zone: 'PVS', consumption: 260 },
      { week: 'Week 5', zone: 'Kadri', consumption: 200 },
    ],
  };

  // Table dummy data
  const dummyTable = [
    { meterId: 123, date: '2025-10-07T07:15:13Z', userName: 'abc', zone: 'Mangalore', consumption: '24 kWh', status: 'Active' },
    { meterId: 124, date: '2025-10-07T08:20:15Z', userName: 'def', zone: 'Mangalore', consumption: '18 kWh', status: 'Active' },
    { meterId: 125, date: '2025-10-07T09:30:22Z', userName: 'ghi', zone: 'Bejai', consumption: '32 kWh', status: 'Active' },
    { meterId: 126, date: '2025-10-07T10:45:18Z', userName: 'jkl', zone: 'Bejai', consumption: '28 kWh', status: 'Active' },
    { meterId: 127, date: '2025-10-07T11:15:33Z', userName: 'mno', zone: 'Pumpwell', consumption: '45 kWh', status: 'Active' },
    { meterId: 128, date: '2025-10-07T12:20:44Z', userName: 'pqr', zone: 'Pumpwell', consumption: '38 kWh', status: 'De-Activated' },
    { meterId: 129, date: '2025-10-07T13:35:27Z', userName: 'stu', zone: 'PVS', consumption: '52 kWh', status: 'Active' },
    { meterId: 130, date: '2025-10-07T14:40:19Z', userName: 'vwx', zone: 'PVS', consumption: '41 kWh', status: 'Active' },
    { meterId: 131, date: '2025-10-07T15:50:36Z', userName: 'yz', zone: 'Kadri', consumption: '29 kWh', status: 'Active' },
    { meterId: 132, date: '2025-10-07T16:55:42Z', userName: 'abc2', zone: 'Kulai', consumption: '22 kWh', status: 'De-Activated' },
  ];

  //  Updated Column structure
  const columns = [
    { key: 'meterId', label: t('zoneUser.reports_and_analytics.meter_id') },
    { key: 'date', label: t('zoneUser.reports_and_analytics.dates') },
    { key: 'userName', label: t('zoneUser.reports_and_analytics.user_name') },
    { key: 'zone', label: t('zoneUser.reports_and_analytics.zone') },
    { key: 'consumption', label: t('zoneUser.reports_and_analytics.consumption') },
    { key: 'status', label: t('zoneUser.reports_and_analytics.status') },
  ];

  const dropdownOptions = ['Zone', 'Meter ID', 'User Name', 'Status'];

  const quickActions = [
    { label: t('zoneUser.dashboard.add_meter'), icon: Upload },
    { label: t('zoneUser.dashboard.generate_report'), icon: Upload },
  ];

  // Filter logic
  const [filteredTableData, setFilteredTableData] = useState(dummyTable);
  const [filteredChartData, setFilteredChartData] = useState(dummyData);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const selectedColumnKey = dropdownOptions[selectedIndex].toLowerCase().replace(' ', '');

    if (!value.trim()) {
      setFilteredTableData(dummyTable);
      setFilteredChartData(dummyData);
      return;
    }

    // Filter table
    const newTableData = dummyTable.filter((row) =>
      row[selectedColumnKey]?.toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTableData(newTableData);

    // Filter chart (if by zone)
    if (selectedColumnKey === 'zone') {
      const newChartData = {};
      Object.keys(dummyData).forEach((timeRange) => {
        newChartData[timeRange] = dummyData[timeRange].filter((item) =>
          item.zone.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredChartData(newChartData);
    } else {
      setFilteredChartData(dummyData);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    setFilteredTableData(dummyTable);
    setFilteredChartData(dummyData);
  };

  return (
    <div className={`flex flex-col`}>
      {/* Header */}
      <h1 className={`text-2xl font-bold ${theme.text.primary} pb-3`}>
        {t('zoneUser.reports_and_analytics.reports_and_analytics')}
      </h1>

      {/* Line Chart */}
      <ReusableLineChart
        title={t('zoneUser.reports_and_analytics.trend_of_energy_usage_over_time')}
        data={filteredChartData}
        row="consumption"
        col="time"
        displayFilter={['day', 'week', 'month']}
      />

      {/* Compare Zones */}
      <div>
        <h1 className={`text-xl font-semibold ${theme.text.primary}`}>
          {t('zoneUser.reports_and_analytics.compare_zone_consumption')}
        </h1>

        <div className="flex flex-row justify-between w-full mt-5">
          {/* Search and Filter */}
          <div
            className={`flex flex-row justify-center items-center border-2 ${theme.border.primary} ${theme.background.card} w-4/5 rounded-lg`}
          >
            <div className="w-1/5">
              <Dropdown items={dropdownOptions} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
            </div>

            <div className="w-px h-8 bg-gray-400 mx-4"></div>

            <div className={`${theme.background.card} relative w-4/5`}>
              <input
                type="text"
                value={searchText}
                onChange={handleSearch}
                placeholder={t('zoneUser.user_management.search')}
                className={`w-full px-4 py-2 ${theme.background.card} focus:outline-none`}
              />
              {searchText && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Year Selector */}
          <div
            className={`flex flex-row justify-center items-center space-x-3 ${theme.background.card} rounded-xl border-2 ${theme.border.primary} px-4 py-2`}
          >
            <button
              onClick={() => setSelectedYear(selectedYear - 1)}
              className={`${theme.text.primary} hover:${theme.background.highlight} rounded-full p-1`}
            >
              <ChevronLeft size={20} />
            </button>
            <div className={`${theme.text.primary} font-semibold`}>{selectedYear}</div>
            <button
              onClick={() => setSelectedYear(selectedYear + 1)}
              className={`${theme.text.primary} hover:${theme.background.highlight} rounded-full p-1`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Bar Chart */}
        <ReusableBarChart title="" data={filteredChartData} row="consumption" col="zone" />
      </div>

      {/* Reports Table */}
      <div className="mt-6">
        <div className={`flex flex-row justify-between items-center mb-4`}>
          <h2 className={`text-xl font-semibold ${theme.text.primary}`}>
            {t('zoneUser.reports_and_analytics.reports')}
          </h2>

          <div className="flex flex-row space-x-2">
            {quickActions.map((action, index) => (
              <QuickActionButton key={index} icon={action.icon} label={action.label} />
            ))}
          </div>
        </div>

        <TableComponent dummyData={filteredTableData} columns={columns} pagination={true} />
      </div>
    </div>
  );
}
