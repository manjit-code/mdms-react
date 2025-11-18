import React, { useState } from "react";
import { OctagonAlert, ThumbsUp, ThumbsDown, Scan, Minimize2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function AlertCard({ alerts }) {
    const theme = useSelector((state) => state.theme.colors);
    const [selectedAlert, setSelectedAlert] = useState(alerts[0]);
    const [isExpanded, setIsExpanded] = useState(false);
    const {t} = useTranslation();
    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div
            className={`flex flex-col md:flex-row w-full gap-4 transition-all duration-300 p-3 rounded-2xl shadow-lg border-black`}
        >
            {!isExpanded && (
                <div
                    className={`flex flex-col w-full md:w-1/3 p-4 rounded-2xl shadow-lg ${theme.background.card}`}
                >
                    <h2 className={`text-lg font-semibold mb-3 ${theme.text.primary}`}>
                        {t('enterprise.dashboard.recent_alerts')}
                    </h2>
                    <div className="space-y-2 overflow-y-scroll no-scrollbar max-h-[400px]">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                onClick={() => setSelectedAlert(alert)}
                                className={`p-3 rounded-xl cursor-pointer border transition-all duration-200 ${selectedAlert.id === alert.id
                                        ? `${theme.border.accent} bg-opacity-10`
                                        : theme.border.primary
                                    } hover:${theme.background.hover}`}
                            >
                                <h3 className={`font-semibold ${theme.text.primary}`}>
                                    {alert.title}
                                </h3>
                                <p
                                    className={`text-sm text-ellipsis overflow-hidden whitespace-nowrap ${theme.text.secondary}`}
                                >
                                    {alert.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div
                className={`relative flex flex-col p-6 rounded-2xl shadow-lg ${theme.background.card} transition-all duration-500 ease-in-out ${isExpanded ? "w-full" : "flex-1"
                    }`}
            >
                <button
                    onClick={toggleExpand}
                    className={`absolute top-4 right-4 p-2 rounded-full`}
                    title={isExpanded ? "Collapse" : "Expand"}
                >
                    {isExpanded ? (
                        <Minimize2 className="text-red-500" strokeWidth={2.2} />
                    ) : (
                        <Scan className="text-red-500" strokeWidth={2.2} />
                    )}
                </button>

                {/* Alert Content */}
                <div className="flex flex-col items-center justify-center text-center mt-4">
                    <OctagonAlert
                        size={50}
                        className="text-red-500 mb-2"
                        strokeWidth={2.2}
                    />
                    <h3 className={`text-2xl font-semibold mb-2 ${theme.text.primary}`}>
                        {selectedAlert.title}
                    </h3>
                    <p
                        className={`text-sm md:text-base leading-relaxed mb-6 max-w-md ${theme.text.secondary}`}
                    >
                        {selectedAlert.details}
                    </p>

                    <div className="flex space-x-6 mt-2">
                        <button
                            className={`p-2 rounded-full hover:bg-green-500 hover:text-white transition ${theme.text.secondary}`}
                            title="Acknowledge"
                        >
                            <ThumbsUp size={22} />
                        </button>
                        <button
                            className={`p-2 rounded-full hover:bg-red-500 hover:text-white transition ${theme.text.secondary}`}
                            title="Dismiss"
                        >
                            <ThumbsDown size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
