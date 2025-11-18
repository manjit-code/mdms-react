import React, { useState } from 'react';
import { UserPlus, Eye, Edit, Trash2} from 'lucide-react';
import ActionMenuCell from '../../components/ui/form/ActionMenuCell';
import { useSelector } from 'react-redux';
import QuickActionButton from '../../components/ui/button/QuickActionButton';
import TableComponent from '../../components/ui/table/TableComponent';
import ModalWrapper from '../../components/ui/modal/ModalWrapper';
import CompareBarChart from '../../components/ui/charts/CompareBarChart'
import InviteUserForm from '../../components/ui/form/InviteUserForm';
import { useTranslation } from 'react-i18next';

export default function AdminUserRoleManagement() {
  const theme = useSelector(state => state.theme.colors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {t} = useTranslation()
  const columns = [
    { key: "UserID", label: "User ID" },
    { key: "Name", label: "Name" },
    { key: "Email", label: "Email" },
    { key: "Role", label: "Role" },
    { key: "Status", label: "Status" },
  ];

  const dummyData = [
    { UserID: 123, Name: "abc", Email: "abc@gmail.com", Role: "abcd", Status: "Active" },
    { UserID: 123, Name: "abc", Email: "abc@gmail.com", Role: "abcd", Status: "Active" },
    { UserID: 123, Name: "abc", Email: "abc@gmail.com", Role: "abcd", Status: "Active" },
    { UserID: 124, Name: "xyz", Email: "xyz@gmail.com", Role: "abcd", Status: "Active" },
    { UserID: 124, Name: "xyz", Email: "xyz@gmail.com", Role: "abcd", Status: "De-Activated" },
    { UserID: 124, Name: "xyz", Email: "xyz@gmail.com", Role: "abcd", Status: "De-Activated" },
    { UserID: 124, Name: "xyz", Email: "xyz@gmail.com", Role: "abcd", Status: "De-Activated" },
    { UserID: 124, Name: "xyz", Email: "xyz@gmail.com", Role: "abcd", Status: "De-Activated" },
    { UserID: 124, Name: "xyz", Email: "xyz@gmail.com", Role: "abcd", Status: "De-Activated" },
    { UserID: 124, Name: "xyz", Email: "xyz@gmail.com", Role: "abcd", Status: "De-Activated" },
  ];

  const actions = [
    { label: "View", icon: Eye, onClick: (r) => alert(`Viewing ${r.Name}`) },
    { label: "Edit", icon: Edit, onClick: (r) => alert(`Editing ${r.Name}`) },
    { label: "Delete", icon: Trash2, onClick: (r) => alert(`Deleting ${r.Name}`) },
  ];

  const renderActionCell = (row) => <ActionMenuCell row={row} actions={actions} />;

  const chartDataByYear = {
    2024: [
      { status: "Active", count: 100 },
      { status: "De-Activated", count: 40 },
    ],
    2025: [
      { status: "Active", count: 95 },
      { status: "De-Activated", count: 55 },
    ],
  };

  const handleInviteClick = () => {
    console.log("Invite button clicked");
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-xl font-semibold ${theme.text.primary}`}>
            {t('enterprise.user_role_management.user_role_management')}
          </h1>

          <QuickActionButton
            icon={UserPlus}
            label={t('enterprise.user_role_management.invite_user')}
            onClick={handleInviteClick}
          />
        </div>

        <TableComponent
          dummyData={dummyData}
          columns={columns}
          renderActionCell={renderActionCell}
          pagination={true}
          showActions={true}
        />

        <CompareBarChart
          title={t('enterprise.user_role_management.comparison_chart_title')}
          dataByYear={chartDataByYear}
        />

        <ModalWrapper
          title={t('enterprise.user_role_management.invite_user')}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <InviteUserForm />
        </ModalWrapper>
      </div>
    </div>
  );
}