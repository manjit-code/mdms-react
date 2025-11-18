import React from 'react'
import DashboardCard from '../../components/ui/card/DashboardCard'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { ChartNoAxesColumn, OctagonAlert, Activity, TrendingUp } from 'lucide-react';
import AlertCard from '../../components/ui/card/AlertCard';
import LeafletMap from '../../components/ui/uncategorized/LeafletMap';

export default function AdminDashboard() {
    const theme = useSelector(state => state.theme.colors);
    const themeMode = useSelector(state => state.theme)
    const { t } = useTranslation();
    const alerts = [
        {
            id: 1,
            title: 'Alert 1',
            description:
                'A dummy or placeholder text commonly used in graphic design, publishing, and web development.',
            details:
                'This is Alert 1. Its purpose is to demonstrate how an alert detail panel would appear in the UI layout.',
        },
        {
            id: 2,
            title: 'Alert 2',
            description:
                'A dummy or placeholder text commonly used in graphic design, publishing, and web development.',
            details:
                'Alert 2 is typically a medium priority issue requiring quick attention, like a meter connectivity drop.',
        },
        {
            id: 3,
            title: 'Alert 3',
            description:
                'A dummy or placeholder text commonly used in graphic design, publishing, and web development.',
            details:
                'Alert 3 represents lower priority notifications — informational updates or minor configuration changes.',
        },
        {
            id: 4,
            title: 'Alert 4',
            description:
                'A dummy or placeholder text commonly used in graphic design, publishing, and web development.',
            details:
                'Alert 4 may refer to resolved issues or historical alerts maintained for audit purposes.',
        },
        {
            id: 5,
            title: 'Alert 1',
            description:
                'A dummy or placeholder text commonly used in graphic design, publishing, and web development.',
            details:
                'This is Alert 1. Its purpose is to demonstrate how an alert detail panel would appear in the UI layout.',
        },
        {
            id: 6,
            title: 'Alert 2',
            description:
                'A dummy or placeholder text commonly used in graphic design, publishing, and web development.',
            details:
                'Alert 2 is typically a medium priority issue requiring quick attention, like a meter connectivity drop.',
        },
        {
            id: 7,
            title: 'Alert 3',
            description:
                'A dummy or placeholder text commonly used in graphic design, publishing, and web development.',
            details:
                'Alert 3 represents lower priority notifications — informational updates or minor configuration changes.',
        },
        {
            id: 8,
            title: 'Alert 4',
            description:
                'A dummy or placeholder text commonly used in graphic design, publishing, and web development.',
            details:
                'Alert 4 may refer to resolved issues or historical alerts maintained for audit purposes.',
        },
    ]
    const items = [{ title: t('enterprise.dashboard.total_zones'), value: 256, componentPassed: ChartNoAxesColumn }, { title: t('enterprise.dashboard.total_meters'), value: 55, componentPassed: TrendingUp }, { title: t('enterprise.dashboard.critical_alerts'), value: 26, componentPassed: OctagonAlert }, { title: t('enterprise.dashboard.average_consumption_per_zone'), value: "26%", componentPassed: Activity },]
    return (
        <div className={`flex flex-col space-y-2`}>
            <div>
                <div>
                    <h1 className={`text-xl font-semibold ${theme.text.primary}`}>{t('enterprise.dashboard.enterprise_dashboard')}</h1>
                </div>
                <div className={`flex flex-wrap justify-between gap-6 mt-2`}>
                    {items.map((item, index) => (
                        <div key={index} className="flex-1 min-w-[250px] max-w-[280px]">
                            <DashboardCard
                                title={item.title}
                                value={item.value}
                                componentPassed={item.componentPassed}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={`flex flex-row mt-6 gap-6`}>
                <div className="flex-1 w-2/5">
                    <LeafletMap theme={themeMode}/>
                </div>
                <div className="flex-1 w-3/5">{

                    <AlertCard
                        alerts={alerts}
                    />
                }</div>
            </div>

        </div>
    )
}
