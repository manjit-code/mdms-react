import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TableComponent from '../../components/ui/table/TableComponent';
import { Eye, CreditCard } from 'lucide-react';
import ActionMenuCell from '../../components/ui/form/ActionMenuCell';

export default function EndUserBillPayments() {
  const theme = useSelector((state) => state.theme.colors);
  const { t } = useTranslation();

  // Dummy Data
  const dummyData = [
    { month: "January", amount: "$2999", due_date: "2024-01-15", status: "Paid" },
    { month: "February", amount: "$1999", due_date: "2024-02-15", status: "Pending" },
    { month: "March", amount: "$2500", due_date: "2024-03-15", status: "Paid" },
    { month: "April", amount: "$1800", due_date: "2024-04-15", status: "Pending" },
    { month: "May", amount: "$2200", due_date: "2024-05-15", status: "Paid" },
    { month: "June", amount: "$1950", due_date: "2024-06-15", status: "Pending" },
    { month: "July", amount: "$2100", due_date: "2024-07-15", status: "Paid" },
    { month: "August", amount: "$2300", due_date: "2024-08-15", status: "Pending" },
    { month: "September", amount: "$2400", due_date: "2024-09-15", status: "Paid" },
    { month: "October", amount: "$1900", due_date: "2024-10-15", status: "Pending" },
    { month: "November", amount: "$2600", due_date: "2024-11-15", status: "Paid" },
    { month: "December", amount: "$2700", due_date: "2024-12-15", status: "Pending" },
  ];

  // Columns (Object Structure)
  const columns = [
    { key: 'month', label: t('endUser.bills.month') },
    { key: 'amount', label: t('endUser.bills.amount') },
    { key: 'due_date', label: t('endUser.bills.due_date') },
    { key: 'status', label: t('endUser.bills.status') },
  ];

  //  Actions
  const actions = [
    { label: t('endUser.bills.view'), icon: Eye, onClick: (row) => alert(`Viewing bill for ${row.month}`) },
    { label: t('endUser.bills.pay'), icon: CreditCard, onClick: (row) => alert(`Paying bill for ${row.month}`) },
  ];

  const renderActionCell = (row) => (
    <ActionMenuCell row={row} rowKey="month" actions={actions} />
  );

  return (
    <div className="p-4">
      {/* Page Header */}
      <h3 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>
        {t('endUser.bills.my_bills')}
      </h3>

      {/* Table Section */}
      <div className="my-5">
        <TableComponent
          dummyData={dummyData}
          columns={columns}
          showActions={true}
          renderActionCell={renderActionCell}
          pagination={true}
        />
      </div>

      {/* Footer Note */}
      <h4 className={`text-sm mt-4 italic ${theme.text.secondary}`}>
        {t('endUser.bills.note')}
      </h4>
    </div>
  );
}