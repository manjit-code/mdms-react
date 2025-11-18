import React, { useState } from 'react';
import QuickActionButton from '../../components/ui/button/QuickActionButton';
import { UserPlus, Eye, Edit, Power, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TableComponent from '../../components/ui/table/TableComponent';
import ActionMenuCell from '../../components/ui/form/ActionMenuCell';
import Dropdown from '../../components/ui/uncategorized/Dropdown';

export default function ZoneUserUserManagement() {
  const { t } = useTranslation();
  const theme = useSelector(state => state.theme.colors);

  const columns = [
    { key: 'ID', label: t('zoneUser.user_management.id') },
    { key: 'Name', label: t('zoneUser.user_management.name') },
    { key: 'Email', label: t('zoneUser.user_management.email') },
    { key: 'Role', label: t('zoneUser.user_management.role') },
    { key: 'Zone', label: t('zoneUser.user_management.zone') },
    { key: 'Status', label: t('zoneUser.user_management.status') },
  ];

  const dummyData = [
    { ID: '123', Name: 'Manjit', Email: 'manjit@gmail.com', Role: 'User', Zone: 'Mangalore', Status: 'Active' },
    { ID: '124', Name: 'Rahul', Email: 'rahul@gmail.com', Role: 'Admin', Zone: 'Mumbai', Status: 'Inactive' },
    { ID: '125', Name: 'Priya', Email: 'priya@gmail.com', Role: 'User', Zone: 'Delhi', Status: 'Active' },
  ];

  const actions = [
    {
      label: t('zoneUser.user_management.edit'),
      icon: Edit,
      onClick: (row) => alert(`Editing user: ${row.Name}`),
    },
    {
      label: t('zoneUser.user_management.activate'),
      icon: Power,
      onClick: (row) => alert(`Toggling status for: ${row.Name}`),
    },
    {
      label: t('zoneUser.user_management.reset_password'),
      icon: Eye,
      onClick: (row) => alert(`Resetting password for: ${row.Name}`),
    },
  ];

  const renderActionCell = (row) => (
    <ActionMenuCell row={row} rowKey="ID" actions={actions} />
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const selectedColumnKey = columns[selectedIndex].key;

    if (value.trim() === '') {
      setFilteredData(dummyData);
    } else {
      const newData = dummyData.filter((row) =>
        row[selectedColumnKey]?.toString().toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(newData);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    setFilteredData(dummyData);
  };

  return (
    <div className={`flex flex-col space-y-2`}>
      <div className='flex flex-row justify-between items-center'>
        <h1 className={`text-2xl font-bold ${theme.text.primary}`}>
          {t('zoneUser.user_management.user_management')}
        </h1>
        <QuickActionButton
          icon={UserPlus}
          label={t('zoneUser.user_management.invite_user')}
        />
      </div>
      
      <div
        className={`flex flex-row justify-center items-center border-2 ${theme.border.primary} ${theme.background.card} rounded-lg p-2`}
      >
        <div className='w-1/5'>
          <Dropdown
            items={columns.map(col => col.label)}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </div>

        <div className='w-px h-8 bg-gray-400 mx-4'></div>

        <div className={`${theme.background.card} relative w-4/5`}>
          <input
            type='text'
            value={searchText}
            onChange={handleSearch}
            placeholder={t('zoneUser.user_management.search')}
            className={`w-full px-4 py-2 ${theme.background.card} focus:outline-none`}
          />
          {searchText && (
            <button
              onClick={clearSearch}
              className='absolute right-3 top-2.5 text-gray-400 hover:text-gray-600'
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className='mt-4'>
        <TableComponent
          dummyData={filteredData}
          columns={columns}
          showActions={true}
          renderActionCell={renderActionCell}
          pagination={true}
        />
      </div>
    </div>
  );
}
