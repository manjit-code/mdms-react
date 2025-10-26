import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import FloatingLabelInput from '../../ui/input/FloatingLabelInput'
import { User } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export default function ProfileSecurityCard() {
  const theme = useSelector(state => state.theme.colors);
  const {t} = useTranslation();
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  return (
   <div className={`${theme.background.card} p-5 rounded-md h-auto flex flex-col items-center justify-center space-y-5 w-2/5`}>
         <div className="relative w-fit h-fit flex justify-center items-center">
           <div className={`w-24 h-24 rounded-full flex items-center justify-center ${theme.background.secondary || 'bg-black'}`}>
             <User size={48} className={`${theme.text.primary || 'text-white'}`} />
           </div>
         </div>
         <div className='w-2/3'>
           <FloatingLabelInput label={t('endUser.profile.current_password')} value={currPass} onChange={e => setCurrPass(e.target.value)} />
           <FloatingLabelInput label={t('endUser.profile.new_password')} value={newPass} onChange={e => setNewPass(e.target.value)} />
           <FloatingLabelInput label={t('endUser.profile.confirm_password')} value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
         </div>
   
         <button className={`${theme.button.action} p-3 rounded-lg`}>{t('endUser.profile.save_and_continue')}</button>
       </div>
     )
   }
