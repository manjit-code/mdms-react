import React from 'react';
import { Eye, Edit, Power, Download, Upload, Ban } from 'lucide-react';
import TableComponent from '../../components/ui/table/TableComponent';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import QuickActionButton from '../../components/ui/button/QuickActionButton';
import ActionMenuCell from '../../components/ui/form/ActionMenuCell';

export default function ZoneUserMeterManagement() {
  const theme = useSelector((state) => state.theme.colors);
  const { t } = useTranslation();

  // ✅ Dummy data
  const dummyData = [
    { MeterID: '123', Zone: 'Mangalore', Owner: 'abc', Status: 'Active', LastReading: '2025-10-07T07:15:13Z' },
    { MeterID: '124', Zone: 'Bajpe', Owner: 'xyz', Status: 'De-Activated', LastReading: '2025-10-07T07:15:13Z' },
    { MeterID: '125', Zone: 'Surathkal', Owner: 'rahul', Status: 'Active', LastReading: '2025-10-08T10:20:13Z' },
    { MeterID: '126', Zone: 'Udupi', Owner: 'priya', Status: 'De-Activated', LastReading: '2025-10-08T14:05:13Z' },
  ];

  // Columns: Define as { key, label }
  const columns = [
    { key: 'MeterID', label: t('zoneUser.meter_management.meter_id') },
    { key: 'Zone', label: t('zoneUser.meter_management.zone') },
    { key: 'Owner', label: t('zoneUser.meter_management.owner') },
    { key: 'Status', label: t('zoneUser.meter_management.status') },
    { key: 'LastReading', label: t('zoneUser.meter_management.last_reading') },
  ];

  // Row Actions (for the menu)
  const actions = [
    { label: t('zoneUser.meter_management.view'), icon: Eye, onClick: (row) => alert(`Viewing meter ${row.MeterID}`) },
    { label: t('zoneUser.meter_management.edit'), icon: Edit, onClick: (row) => alert(`Editing meter ${row.MeterID}`) },
    { label: t('zoneUser.meter_management.active'), icon: Power, onClick: (row) => alert(`Activating meter ${row.MeterID}`) },
  ];

  // Action cell renderer
  const renderActionCell = (row) => (
    <ActionMenuCell row={row} rowKey="MeterID" actions={actions} />
  );

  // Quick Action Buttons
  const quickActions = [
    { label: t('zoneUser.meter_management.import_csv'), icon: Download },
    { label: t('zoneUser.meter_management.export_csv'), icon: Upload },
    { label: t('zoneUser.meter_management.de_activate_meters'), icon: Ban },
  ];

  return (
    <div className="p-5">
      {/* Page Header */}
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${theme.text.primary}`}>
          {t('zoneUser.meter_management.meter_management')}
        </h1>

        {/* Quick Action Buttons */}
        <div className="flex flex-row space-x-2">
          {quickActions.map((action, index) => (
            <QuickActionButton key={index} icon={action.icon} label={action.label} />
          ))}
        </div>
      </div>

      {/* Table Section */}
      <TableComponent
        dummyData={dummyData}
        columns={columns}
        showActions={true}
        renderActionCell={renderActionCell}
        pagination={true}
      />
    </div>
  );
}