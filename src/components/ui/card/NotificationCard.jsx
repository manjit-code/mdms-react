import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function NotificationCard({ title, description, onClick, isActive }) {
    const theme = useSelector(state => state.theme.colors);

    return (
        <div className='flex justify-center w-full'>
            <button
                onClick={onClick}
                className={`flex flex-row items-center rounded-lg mt-5 cursor-pointer transition-all duration-300 relative w-full md:w-3/4 h-auto p-1 shadow-2xl hover:scale-[1.01] hover:shadow-lg ${isActive ? 'scale-[1.02] ring-0 ring-offset-2 ' : ''}`}
            >
                <div
                    className={`min-w-[60px] h-[60px] flex justify-center items-center ${theme.background.card} rounded-l-lg`}
                >
                    <Bell size={25} className={`${theme.text.primary}`} />
                </div>

                <div className={`flex flex-col  p-3 flex-grow justify-center text-left`}>
                    <h3 className={`text-sm ${theme.text.primary} line-clamp-1`}>{title}</h3>
                    <p className={`text-sm ${theme.text.primary} line-clamp-1`}>{description}</p>
                </div>
            </button>
        </div>
    )
}
