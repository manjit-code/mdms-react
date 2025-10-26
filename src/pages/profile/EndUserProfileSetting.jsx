import React, { useEffect, useState } from 'react'
import ProfileCard from '../../components/ui/card/ProfileCard';
import ProfileNotificationCard from '../../components/ui/card/ProfileNotificationCard';
import ProfileSecurityCard from '../../components/ui/card/ProfileSecurityCard';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function EndUserProfileSetting() {
    const [currButton, setCurrentButton] = useState('1');
    const [componentToRender, setComponentToRender] = useState(<ProfileCard/>);
    const theme = useSelector(state => state.theme.colors);
    const {t} = useTranslation();
    useEffect(() => {
        helperFunction();
        // console.log(componentToRender);
    }, [currButton])

    function helperFunction() {
        switch (currButton) {
            case '1':
                setComponentToRender(<ProfileCard />);
                break;
            case '2':
                setComponentToRender(<ProfileSecurityCard />);
                break;
            case '3':
                setComponentToRender(<ProfileNotificationCard />);
                break;
            default:
                setComponentToRender(null);
        }
        console.log(currButton);
    }

    const handleClick = ({value}) => {
        setCurrentButton(value);
    }
    return (
        <div className={`flex flex-col h-full`}>
            <div className={`flex flex-col mb-5`}>
                <h3 className='font-bold mb-20'>{t('endUser.profile.profile_settings')}</h3>
                <div className={`flex flex-row justify-between px-5 pb-5`}>
                    <button onClick={() => handleClick({ value: '1' })} className={`${currButton == '1' ? 'underline' : ''}`}>{t('endUser.profile.profile')}</button>
                    <button onClick={() => handleClick({ value: '2' })} className={`${currButton == '2' ? 'underline' : ''}`}>{t('endUser.profile.security')}</button>
                    <button onClick={() => handleClick({ value: '3' })} className={`${currButton == '3' ? 'underline' : ''}`}>{t('endUser.profile.notification')}</button>
                </div>
                <hr className='divide-y-1'/>
            </div>

            <div className={`p-10 flex justify-center items-center`} >
                {componentToRender}
            </div>
        </div>
    )
}
