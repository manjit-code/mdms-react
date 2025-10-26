import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FloatingLabelInput from '../../ui/input/FloatingLabelInput'
import { User, Edit3 } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export default function ProfileCard() {
  const theme = useSelector(state => state.theme.colors);
  const {t} = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  return (
    <div className={`${theme.background.card} p-5 rounded-md h-auto flex flex-col items-center justify-center space-y-5 w-2/5`}>
      <div className="relative w-fit h-fit flex justify-center items-center">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center ${theme.background.secondary || 'bg-black'}`}>
          <User size={48} className={`${theme.text.primary || 'text-white'}`} />
        </div>
        <div
          className={`absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4
                      w-8 h-8 rounded-full p-1 flex items-center justify-center 
                      shadow-md cursor-pointer 
                      ${theme.background.primary || 'bg-white'} 
                      border ${theme.border.primary || 'border-black'}`}
        >
          <Edit3 size={16} className={`${theme.text.primary|| 'text-black'}`} />
        </div>
      </div>
      <div className='w-2/3'>
        <FloatingLabelInput label={t('endUser.profile.name')} value={name} onChange={e => setName(e.target.value)} />
        <FloatingLabelInput label={t('endUser.profile.email1')} value={email} onChange={e => setEmail(e.target.value)} />
        <FloatingLabelInput label={t('endUser.profile.mobile_no')} value={mobile} onChange={e => setMobile(e.target.value)} />
      </div>

      <button className={`${theme.button.action} p-3 rounded-lg`}>{t('endUser.profile.save_and_continue')}</button>
    </div>
  )
}
