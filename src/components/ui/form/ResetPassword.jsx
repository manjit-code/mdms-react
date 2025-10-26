import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {
    const { t, i18n } = useTranslation();
    const theme = useSelector(state => state.theme.colors);
    const navigate = useNavigate();

    const onSubmitClick = () => {
        navigate('/login')
    }
    return (
        <div className="flex h-screen items-center content-center">
            <form onSubmit={onSubmitClick()} className="flex justify-center flex-col text-center space-y-4 w-[50vw]">
                <div className={`text-lg`}>{t('reset_password.title')}</div>
                <input
                    type="text"
                    name="email"
                    placeholder={t('reset_password.email')}
                    className={`rounded-full px-4 py-2 w-full ${theme.button.secondary.bg}`}
                />
                <input
                    type="password"
                    name="password"
                    placeholder={t('reset_password.password')}
                    className={`rounded-full px-4 py-2 w-full ${theme.button.secondary.bg}`}
                />
                <div className='flex justify-center'>
                    <button
                        type="submit"
                        className={`rounded-full ${theme.button.primary.bg} py-2 text-white w-2/5 `}
                    >
                        {t('reset_password.update_password')}
                    </button>
                </div>
            </form>
        </div>
    )
}