import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Pagination from './Pagination'

export default function TableComponent({ 
  dummyData, 
  columns, 
  pagination = false, 
  showActions = false, 
  renderActionCell = null,
  rowsPerPage = 5 
}) {
  const theme = useSelector(state => state.theme.colors)
  const { t } = useTranslation()
  const [currPage, setCurrPage] = useState(1)

  // Calculate pagination
  const { paginatedData, totalPages } = useMemo(() => {
    if (!pagination) {
      return { paginatedData: dummyData, totalPages: 1 }
    }

    const total = Math.ceil(dummyData.length / rowsPerPage)
    const startIndex = (currPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const paginated = dummyData.slice(startIndex, endIndex)

    return { paginatedData: paginated, totalPages: total }
  }, [dummyData, currPage, rowsPerPage, pagination])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrPage(page)
    }
  }

  // Calculate height for empty space (60px per row)
  const emptyRowsCount = pagination ? rowsPerPage - paginatedData.length : 0;
  const tableHeight = rowsPerPage * 60; // Fixed height for consistent spacing

  return (
    <div className='mt-5'>
      {/* Table wrapper with fixed height */}
      <div style={{ minHeight: `${tableHeight}px` }}>
        <div className={`${theme.background.card} rounded-xs overflow-hidden`}>
          <table className='w-full border-collapse table-fixed'>
            <thead className={`${theme.background.table_head}`}>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-5 py-3 text-center font-medium ${theme.text.primary} border ${theme.border.primary}`}
                  >
                    {col.label}
                  </th>
                ))}
                {showActions && (
                  <th
                    className={`px-5 py-3 text-center font-medium ${theme.text.primary} border ${theme.border.primary}`}
                  >
                    {t('enterprise.zone_management.more_action')}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                <>
                  {paginatedData.map((row, index) => (
                    <tr key={index} className={`${theme.text.hover}`} style={{ height: '60px' }}>
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-5 py-3 text-center ${theme.text.primary} border ${theme.border.primary}`}
                        >
                          {row[col.key]}
                        </td>
                      ))}
                      {showActions && (
                        <td
                          className={`px-5 py-3 text-center ${theme.text.primary} border ${theme.border.primary}`}
                        >
                          {renderActionCell ? renderActionCell(row) : null}
                        </td>
                      )}
                    </tr>
                  ))}
                </>
              ) : (
                <tr style={{ height: `${tableHeight}px` }}>
                  <td
                    colSpan={columns.length + (showActions ? 1 : 0)}
                    className={`px-5 py-8 text-center ${theme.text.primary} border ${theme.border.primary}`}
                  >
                    {t('common.no_data_available') || 'No data available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Empty space with parent background - only shows when rows < rowsPerPage */}
        {emptyRowsCount > 0 && paginatedData.length > 0 && (
          <div style={{ height: `${emptyRowsCount * 60}px` }} className="w-full" />
        )}
      </div>
      
      {/* Fixed gap before pagination */}
      {pagination && totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currPage={currPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            maxVisiblePages={5}
          />
        </div>
      )}
    </div>
  )
}