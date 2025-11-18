import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const theme = useSelector(state => state.theme.colors);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const onSubmitClick = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    alert(`Password reset link sent to ${email}`);
    navigate('/login');
  };

  return (
    <div className={`flex h-screen items-center justify-center ${theme.background.primary}`}>
      <form onSubmit={onSubmitClick} className="flex justify-center flex-col items-center space-y-6 w-[450px]">
        <h1 className={`text-2xl font-semibold ${theme.text.primary}`}>Forgot password</h1>
        
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className={`rounded-full px-6 py-3 w-full ${theme.input.base} ${theme.input.focus}`}
          required
        />
        
        <Link to='/' className="text-indigo-600 hover:text-indigo-800 font-medium">
          {t('forgot_password.login')}
        </Link>
        
        <button
          type="submit"
          className={`rounded-full px-8 py-3 w-60 ${theme.button.primary} font-medium transition-all`}
        >
          {t('forgot_password.send_reset_link')}
        </button>
      </form>
    </div>
  );
}