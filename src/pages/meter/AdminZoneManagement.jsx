import React, { useState } from 'react';
import TableComponent from '../../components/ui/table/TableComponent';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import QuickActionButton from '../../components/ui/button/QuickActionButton';
import ActionMenuCell from '../../components/ui/form/ActionMenuCell';
import { CirclePlus, Eye, Edit, Trash2 } from 'lucide-react';
import ModalWrapper from '../../components/ui/modal/ModalWrapper';
import AddZoneForm from '../../components/ui/form/AddZone';

export default function AdminZoneManagement() {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.colors);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const quickActions = [
    { label: t('enterprise.zone_management.add_zone'), icon: CirclePlus },
  ];

  const tableData = [
    { zoneId: 123, zoneName: 'Mangalore', adminAssigned: 'abc', totalMeters: 5, status: 'Active' },
    { zoneId: 124, zoneName: 'Bajpe', adminAssigned: 'xyz', totalMeters: 23, status: 'De-Activated' },
    { zoneId: 125, zoneName: 'Udupi', adminAssigned: 'john', totalMeters: 15, status: 'Active' },
    { zoneId: 126, zoneName: 'Surathkal', adminAssigned: 'mike', totalMeters: 8, status: 'De-Activated' },
    { zoneId: 127, zoneName: 'Moodbidri', adminAssigned: 'rahul', totalMeters: 4, status: 'Active' },
  ];

  const columns = [
    { key: 'zoneId', label: t('enterprise.zone_management.zone_id') },
    { key: 'zoneName', label: t('enterprise.zone_management.zone_name') },
    { key: 'adminAssigned', label: t('enterprise.zone_management.admin_assigned') },
    { key: 'totalMeters', label: t('enterprise.zone_management.total_meters') },
    { key: 'status', label: t('enterprise.zone_management.status') },
  ];

  const actions = [
    { label: t('enterprise.zone_management.view'), icon: Eye, onClick: (row) => alert(`Viewing ${row.zoneName}`) },
    { label: t('enterprise.zone_management.edit'), icon: Edit, onClick: (row) => alert(`Editing ${row.zoneName}`) },
    { label: t('enterprise.zone_management.delete'), icon: Trash2, onClick: (row) => alert(`Deleting ${row.zoneName}`) },
  ];

  const renderActionCell = (row) => <ActionMenuCell row={row} rowKey="zoneId" actions={actions} />;

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h3 className={`text-xl font-semibold ${theme.text.primary}`}>
          {t('enterprise.zone_management.zone_management')}
        </h3>
        <div className="flex flex-row space-x-2">
          {quickActions.map((action, index) => (
            <QuickActionButton
              key={index}
              icon={action.icon}
              label={action.label}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>

      <div>
        <TableComponent
          dummyData={tableData}
          columns={columns}
          renderActionCell={renderActionCell}
          pagination={true}
          showActions={true}
        />
      </div>

      <ModalWrapper
        title={t('enterprise.zone_management.add_zone')}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AddZoneForm />
      </ModalWrapper>
    </div>
  );
}
