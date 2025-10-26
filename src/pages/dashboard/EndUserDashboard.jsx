import React, { act, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DashboardCard from '../../components/ui/card/DashboardCard';
import ElectricityConsumptionOverviewGraph from '../../components/ui/charts/ElectricityConsumptionOverviewGraph';
import QuickActionButton from '../../components/ui/button/QuickActionButton';

export default function EndUserDashboard() {
    const { t } = useTranslation();
    const theme = useSelector(state => state.theme.colors);
    const username = "Manjit";
    const asOfDate = "20/10/2025";
    const lastSync = "10:45 AM";
    const dataSource = "Smart Meter #1023";
    const zone = "Bangalore North";

    const [dashboardData] = useState({
        currentConsumption: "256 KWh",
        monthlyBill: {
            amount: "$1200",
            dueDate: "20/10/2025"
        },
        outstandingBalance: "$120",
        lastPayment: {
            amount: "$1200",
            date: "20/09/2025"
        }
    });


    const quickActions = [
        { label: t('endUser.dashboard.pay_bill'), icon: "💳" },
        { label: t('endUser.dashboard.view_bill_history'), icon: "📊" },
        { label: t('endUser.dashboard.manage_notification'), icon: "🔔" }
    ];

    const handleQuickAction = (act) =>{
        console.log("Action: ", act);
    }
    return (
        <div>
            <div className={`p-3 pl-0`}>
                <h1 className={`text-2xl font-bold ${theme.text.primary}`}>{t('endUser.dashboard.welcome')}, {username}</h1>
                <div className={`flex flex-row justify-between px-10 py-3 ${theme.text.secondary} `}>
                    <div>
                        <p>{t('endUser.dashboard.as_of')} {asOfDate}</p>
                        <p>{t('endUser.dashboard.zone')} {zone}</p>
                    </div>
                    <div className={`text-sm ${theme.text.secondary} space-y-1 pr-10`}>
                        <p className={`font-bold mb-2`}>
                            {t('endUser.dashboard.last_sync_at')} {lastSync}
                        </p>
                        <p>{t('endUser.dashboard.data_source')} {dataSource}</p>
                    </div>
                </div>
            </div>


            <div className={`flex flex-wrap`}>
                <DashboardCard
                    title={(t('endUser.dashboard.current_consumption'))}
                    value={dashboardData.currentConsumption}
                />

                <DashboardCard
                    title={(t('endUser.dashboard.this_months_bill'))}
                    value={`${dashboardData.monthlyBill.amount} ${t('endUser.dashboard.due_on')} ${dashboardData.monthlyBill.dueDate}`}
                />

                <DashboardCard
                    title={t('endUser.dashboard.outstanding_balance')}
                    value={`${dashboardData.outstandingBalance} ${t('endUser.dashboard.pending')}`}
                />

                <DashboardCard
                    title={t('endUser.dashboard.last_payment')}
                    value={`${t('endUser.dashboard.paid_on')} ${dashboardData.lastPayment.amount} ${dashboardData.lastPayment.date}`}
                />

            </div>


            <div>
                <div className={`mb-8 p-3 pl-0 rounded-lg ${theme.background.card}`}>
                    <ElectricityConsumptionOverviewGraph/>
                </div>
            </div>


            <div className={`rounded-lg p-3 ${theme.text.primary} ${theme.background.card}`} >
                <h3 className={`text-xl font-semibold mb-5`}>{t('endUser.dashboard.quick_actions')}</h3>
                <div className='flex flex-row space-x-2'>
                    {quickActions.map((action, index) =>(
                    <QuickActionButton 
                    key={index}
                    icon={action.icon}
                    label={action.label}
                    onClickk={() => handleQuickAction(action.label)}
                    />
                ))}
                </div>
            </div>
        </div>
    )
}
