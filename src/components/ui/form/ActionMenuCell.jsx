import React, { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function ActionMenuCell({ row, rowKey = 'id', actions = [] }) {
  const [openRow, setOpenRow] = useState(null)
  const theme = useSelector((state) => state.theme.colors)

  const handleToggle = (id) => {
    setOpenRow(openRow === id ? null : id)
  }

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => handleToggle(row[rowKey])} className={`p-1 rounded ${theme.text.action_hover}`}>
        <MoreVertical size={18} />
      </button>

      {openRow === row[rowKey] && (
        <div
          className={`absolute right-0 mt-2 w-36 rounded-lg shadow-lg ${theme.background.card} ${theme.text.primary} border ${theme.border.primary} z-10`}
        >
          {actions.map((action, index) => (
            <button
              key={index}
              className={`flex items-center w-full px-3 py-2 text-sm ${theme.text.action_hover}`}
              onClick={() => action.onClick?.(row)}
            >
              {action.icon && <action.icon size={14} className="mr-2" />} {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}