import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import TableComponent from '../../components/ui/table/TableComponent';
export default function EndUserBillPayments() {
  const theme = useSelector(state => state.theme.colors);
  const { t } = useTranslation();
  const dummyData1 = [
        { month: "January", amount: "$2999", due_date: "2024-01-15", status: "paid" },
        { month: "February", amount: "$1999", due_date: "2024-02-15", status: "pending" },
        { month: "March", amount: "$2500", due_date: "2024-03-15", status: "paid" },
        { month: "April", amount: "$1800", due_date: "2024-04-15", status: "pending" },
        { month: "May", amount: "$2200", due_date: "2024-05-15", status: "paid" },
        { month: "June", amount: "$1950", due_date: "2024-06-15", status: "pending" },
        { month: "July", amount: "$2100", due_date: "2024-07-15", status: "paid" },
        { month: "August", amount: "$2300", due_date: "2024-08-15", status: "pending" },
        { month: "September", amount: "$2400", due_date: "2024-09-15", status: "paid" },
        { month: "October", amount: "$1900", due_date: "2024-10-15", status: "pending" },
        { month: "November", amount: "$2600", due_date: "2024-11-15", status: "paid" },
        { month: "December", amount: "$2700", due_date: "2024-12-15", status: "pending" }
    ];
  return (
    <div>
      <h3 className='text-xl font-semibold pl-3'>{t('endUser.bills.my_bills')}</h3>
      <div className='my-5'>
        <TableComponent
          dummyData={dummyData1}
          columns={['month', 'amount', 'due_date', 'status']} // case-sensitive
          actions={['View', 'Pay']} 
          pagination={true}
        />
      </div>
      <h4>{t('endUser.bills.note')}</h4>
    </div>
  )
}
