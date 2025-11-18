import React, { useState, useEffect, useRef } from 'react';
import ProfileCard from '../../components/ui/card/ProfileCard';
import ProfileSecurityCard from '../../components/ui/card/ProfileSecurityCard';
import ProfileNotificationCard from '../../components/ui/card/ProfileNotificationCard';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function EndUserProfileSetting() {
  const [currButton, setCurrentButton] = useState('1');
  const theme = useSelector((state) => state.theme?.colors || {});
  const { t } = useTranslation();

  // refs for tab measurement
  const wrapperRef = useRef(null);
  const tab1 = useRef(null);
  const tab2 = useRef(null);
  const tab3 = useRef(null);

  const [underline, setUnderline] = useState({ width: 0, left: 0 });

  const updateUnderline = () => {
    const wrapper = wrapperRef.current;
    const activeRef =
      currButton === '1' ? tab1.current :
        currButton === '2' ? tab2.current :
          tab3.current;

    if (!wrapper || !activeRef) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const activeRect = activeRef.getBoundingClientRect();

    setUnderline({
      width: activeRect.width,
      left: activeRect.left - wrapperRect.left,
    });
  };

  useEffect(updateUnderline, [currButton]);
  useEffect(() => {
    const r = setTimeout(updateUnderline, 50);
    return () => clearTimeout(r);
  }, []);

  const renderComponent = () => {
    switch (currButton) {
      case '1': return <ProfileCard />;
      case '2': return <ProfileSecurityCard />;
      case '3': return <ProfileNotificationCard />;
      default: return <div>{t('endUser.profile.invalid_selection')}</div>;
    }
  };

  const baseTab =
    "px-4 pb-2 text-sm font-medium cursor-pointer transition-all duration-200";

  return (
    <div className="flex flex-col h-full">

      <div className="flex flex-col mb-5">
        <h1 className={`text-2xl font-bold mb-8 ${theme.text?.primary}`}>
          {t('endUser.profile.profile_settings')}
        </h1>

        {/* Tabs Wrapper */}
        <div
          ref={wrapperRef}
          className="relative flex justify-center w-full border-b border-gray-300 pb-4"
        >
          <div className="flex flex-row justify-evenly w-full">

            <button ref={tab1} className={`${baseTab} ${theme.text?.primary}`} onClick={() => setCurrentButton('1')}>
              {t('endUser.profile.profile')}
            </button>

            <button ref={tab2} className={`${baseTab} ${theme.text?.primary}`} onClick={() => setCurrentButton('2')}>
              {t('endUser.profile.security')}
            </button>

            <button ref={tab3} className={`${baseTab} ${theme.text?.primary}`} onClick={() => setCurrentButton('3')}>
              {t('endUser.profile.notification')}
            </button>

          </div>

          <span
            className={`${theme.text?.active} bg-current absolute bottom-0 h-[2px] transition-all duration-300 rounded-full`}
            style={{
              width: underline.width,
              left: underline.left,
            }}
          />
        </div>

      </div>

      {/* Body Content */}
      <div className="p-10 flex justify-center items-center">
        <React.Suspense fallback={<div>{t('endUser.profile.loading')}...</div>}>
          {renderComponent()}
        </React.Suspense>
      </div>

    </div>
  );
}
