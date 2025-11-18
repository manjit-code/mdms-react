import React from 'react'
import { useTranslation } from 'react-i18next'

export default function EndUserLogs() {
  const {t} = useTranslation();
  return (
    <div>
      {t('endUser.logs.title')}
    </div>
  )
}
