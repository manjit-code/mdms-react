import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ElectricityConsumptionOverviewGraph from '../../components/ui/charts/ElectricityConsumptionOverviewGraph';
import TableComponent from '../../components/ui/table/TableComponent';

export default function EndUserMeterData() {
  const { t } = useTranslation();
  const theme = useSelector(state => state.theme.colors);

  const dummyData = [
    { date: "2024-01-15", reading: 2999, difference: 0, notes: "Initial reading" },
    { date: "2024-02-15", reading: 4998, difference: 1999, notes: "Normal consumption" },
    { date: "2024-03-15", reading: 7498, difference: 2500, notes: "Increased usage" },
    { date: "2024-04-15", reading: 9298, difference: 1800, notes: "Efficient month" },
    { date: "2024-05-15", reading: 11498, difference: 2200, notes: "Stable usage" },
    { date: "2024-06-15", reading: 13448, difference: 1950, notes: "Summer begins" },
    { date: "2024-07-15", reading: 15548, difference: 2100, notes: "Peak season" },
    { date: "2024-08-15", reading: 17848, difference: 2300, notes: "High AC usage" },
    { date: "2024-09-15", reading: 20248, difference: 2400, notes: "Consistent usage" },
    { date: "2024-10-15", reading: 22148, difference: 1900, notes: "Moderate consumption" },
    { date: "2024-11-15", reading: 24748, difference: 2600, notes: "Winter preparation" },
    { date: "2024-12-15", reading: 27448, difference: 2700, notes: "Year-end high usage" },
  ];

  const columns = [
    { key: 'date', label: t('endUser.usage.date') },
    { key: 'reading', label: t('endUser.usage.starting') },
    { key: 'difference', label: t('endUser.usage.difference') },
    { key: 'notes', label: t('endUser.usage.notes') },
  ];

  return (
    <div className={`flex flex-col`}>
      <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>
        {t('endUser.usage.select_date_range')}
      </h2>

      <div className={`mb-6`}>
        <ElectricityConsumptionOverviewGraph />
      </div>

      <div>
        <TableComponent
          dummyData={dummyData}
          columns={columns}
          pagination={true}
        />
      </div>
    </div>
  );
}