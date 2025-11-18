import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../../utils/LanguageSelector';
import { ToggleLeft, ToggleRight, CircleUserRound, Bell } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../../redux/slices/ThemeSlice';
import { clearAuth } from '../../../redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const theme = useSelector(state => state.theme);
  const userInfo = useSelector(state => state.auth.userInfo);
  const role = useSelector(state => state.auth.currRole);
  const isLoggedIn = !!role;
  const dispatch = useDispatch();

  const handleThemeButton = () => {
    dispatch(toggleTheme());
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Check session expiry every minute
  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        const loginTime = localStorage.getItem("loginTime");
        if (loginTime) {
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - parseInt(loginTime);
          const minutesPassed = timeDiff / (1000 * 60);
          
          if (minutesPassed > 60) {
            handleLogout();
            alert("Your session has expired. Please login again.");
          }
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("loginTime");
    navigate("/");
  };

  const handleProfileButton = () => {
    setOpenProfileMenu(!openProfileMenu);
    console.log("profile button clicked");
  };

  const handleProfileNavigation = () => {
    if (role === 'consumer') {
      navigate('/consumer/profile_and_settings');
    } else if (role === 'zone') {
      navigate('/zone/settings_notification');
    } else if (role === 'enterprise') {
      navigate('/enterprise/setting_configuration');
    }
    setOpenProfileMenu(false);
  };

  return (
    <div className={`flex justify-between items-center ${theme.colors.background.header} item-center`}>
      <div className={`${theme.colors.text.primary} pl-8 font-bold text-xl`}>
        {t('header.title')}
      </div>
      <div className='flex justify-around items-center p-5 relative'>
        {isLoggedIn && (
          <div>
            <Bell size={25} className={`${theme.colors.text.primary} mr-5 cursor-pointer hover:opacity-70`} />
          </div>
        )}
        <div onClick={handleThemeButton} className={`${theme.colors.text.primary} mr-5 cursor-pointer`}>
          {theme.mode === 'light' ? (
            <ToggleLeft size={30} className={`${theme.colors.text.primary}`} />
          ) : (
            <ToggleRight size={30} className={`${theme.colors.text.primary}`} />
          )}
        </div>
        <LanguageSelector />
        {isLoggedIn && (
          <div ref={profileRef} className="relative">
            <div
              className={`${theme.colors.text.primary} ml-5 pr-3 cursor-pointer hover:opacity-70`}
              onClick={handleProfileButton}
            >
              <CircleUserRound size={25} />
            </div>
            {openProfileMenu && (
              <div
                className={`absolute right-0 top-12 mt-1 w-40 rounded-lg shadow-lg border ${theme.colors.background.card} ${theme.colors.border.primary} z-50`}
              >
                <button
                  className={`block w-full text-left px-4 py-2 rounded-t-lg ${theme.colors.text.action_hover} ${theme.colors.text.primary}`}
                  onClick={handleProfileNavigation}
                >
                  {t('header.my_profile')}
                </button>

                <button
                  className={`block w-full text-left px-4 py-2 rounded-b-lg ${theme.colors.text.action_hover} text-red-600`}
                  onClick={handleLogout}
                >
                  {t('header.logout')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}