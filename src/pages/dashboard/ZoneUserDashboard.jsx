import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DashboardCard from '../../components/ui/card/DashboardCard';
import ElectricityConsumptionOverviewGraph from '../../components/ui/charts/ElectricityConsumptionOverviewGraph';
import QuickActionButton from '../../components/ui/button/QuickActionButton';
import { Activity, TrendingUp, OctagonAlert, CirclePlus, Settings } from 'lucide-react';

export default function ZoneUserDashboard() {
  const { t } = useTranslation();
  const theme = useSelector(state => state.theme.colors);

  const [dashboardData] = useState({
    active_meters: "256",
    avg_usage: "55%",
    pending_alert: "26",
  });

  const dashboardCards = [
    {
      title: t('zoneUser.dashboard.active_meters'),
      value: dashboardData.active_meters,
      componentPassed: Activity,
    },
    {
      title: t('zoneUser.dashboard.avg_usage'),
      value: dashboardData.avg_usage,
      componentPassed: TrendingUp,
    },
    {
      title: t('zoneUser.dashboard.pending_alert'),
      value: dashboardData.pending_alert,
      componentPassed: OctagonAlert,
    },
  ];

  const quickActions = [
    { label: t('zoneUser.dashboard.add_meter'), icon: CirclePlus },
    { label: t('zoneUser.dashboard.generate_report'), icon: Settings },
  ];

  return (
    <div>
      <div className="p-3 pl-0">
        <h1 className={`text-2xl font-bold ${theme.text.primary}`}>
          {t('zoneUser.dashboard.zone_dashboard')}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mb-8">
        {dashboardCards.map((card, index) => (
          <div key={index} className="w-[250px]">
            <DashboardCard
              title={card.title}
              value={card.value}
              componentPassed={card.componentPassed}
            />
          </div>
        ))}
      </div>

      <div className={`mb-8 p-3 pl-0 rounded-lg ${theme.background.card}`}>
        <ElectricityConsumptionOverviewGraph />
      </div>

      <div className={`rounded-lg p-3 ${theme.background.card}`}>
        <h3 className={`text-xl font-semibold mb-5 ${theme.text.primary}`}>
          {t('endUser.dashboard.quick_actions')}
        </h3>
        <div className="flex flex-row space-x-2">
          {quickActions.map((action, index) => (
            <QuickActionButton
              key={index}
              icon={action.icon}
              label={action.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
