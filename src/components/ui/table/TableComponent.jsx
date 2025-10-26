import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Pagination from './Pagination';

export default function TableComponent({ dummyData, columns, pagination = false, actions = [] }) {

    const theme = useSelector(state => state.theme.colors);
    const { t } = useTranslation();

    const data = dummyData;

    return (
        <div>
            <div className={`${theme.background.card} border-2 border-solid ${theme.border.primary} `}>
                <table className='w-full'>

                    <thead className={theme.background.header}>
                        <tr>
                            {
                                columns.map(column => (
                                    <th key={column} className={`px-5 py-3 text-center font-medium ${theme.text.primary} border-2 border-solid ${theme.border.primary}`}>{column}</th>
                                ))
                            }

                            {
                                actions.length > 0 &&
                                <th className={`px-5 py-3 text-center font-medium ${theme.text.primary} border-2 border-solid ${theme.border.primary}`}>{t('endUser.bills.actions')}
                                </th>
                            }
                        </tr>
                    </thead>


                    <tbody>
                        {
                            data.map((row, index) => (
                                <tr key={index}>
                                    {columns.map(column => (
                                        <td key={column} className={`px-5 py-3 text-center font-medium ${theme.text.primary} border-2 border-solid ${theme.border.primary}`}>{row[column]}</td>
                                    ))}

                                    
                                    {actions.length > 0 && (
                                        <td className={`px-5 py-3 text-center font-medium ${theme.text.primary} border-2 border-solid ${theme.border.primary}`}>
                                            <div>
                                                {actions.map((action, actionIndex) => (
                                                    <div key={action}>
                                                        <button>{action}</button>
                                                        {actionIndex < action.length}
                                                        <span>/</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

            {/* Pagination */}
            <div>
                <Pagination
                    currPage ={1}
                    totalPages = {15} 
                    onPageChange = {(page) => console.log( 'Page changed To', page)}
                    maxVisiblePages = {5}
                />
            </div>
        </div>
    )
}
