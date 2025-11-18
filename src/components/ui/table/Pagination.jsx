import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export default function Pagination({ currPage, totalPages, onPageChange, maxVisiblePages = 5 }) {
    const theme = useSelector(state => state.theme.colors)
    const { t } = useTranslation()

    if (totalPages <= 1) return null

    const generatePageNumbers = () => {
        const pageNumbers = []
        let startPage = Math.max(1, currPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        // Adjust if near to end pages
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }
        
        return pageNumbers
    }

    const pageNumbers = generatePageNumbers()

    const buttonBaseClass = `px-4 py-2 border ${theme.border.primary} font-medium transition-all duration-200 rounded-md`
    const buttonActiveClass = `${theme.button.action} shadow-sm`
    const buttonInactiveClass = `${theme.background.card} ${theme.text.primary} ${theme.text.hover}`
    const buttonDisabledClass = `${theme.background.card} ${theme.text.secondary} opacity-50 cursor-not-allowed`

    return (
        <div className={`flex flex-row justify-center items-center gap-2 p-4 rounded-lg`}>
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currPage - 1)}
                disabled={currPage === 1}
                className={`${buttonBaseClass} ${
                    currPage === 1 
                        ? buttonDisabledClass 
                        : buttonInactiveClass
                }`}
                aria-label="Previous page"
            >
                <span className="flex items-center gap-1">
                    <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 19l-7-7 7-7" 
                        />
                    </svg>
                    {t('endUser.bills.previous') || 'Previous'}
                </span>
            </button>

            {/* First Page + Ellipsis */}
            {pageNumbers[0] > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className={`${buttonBaseClass} ${
                            currPage === 1 
                                ? buttonActiveClass 
                                : buttonInactiveClass
                        }`}
                        aria-label="Go to page 1"
                    >
                        1
                    </button>
                    {pageNumbers[0] > 2 && (
                        <span className={`px-2 ${theme.text.secondary}`}>...</span>
                    )}
                </>
            )}

            {/* Page Numbers */}
            {pageNumbers.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`${buttonBaseClass} ${
                        currPage === page 
                            ? buttonActiveClass 
                            : buttonInactiveClass
                    } min-w-[40px]`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {/* Last Page + Ellipsis */}
            {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                    {pageNumbers[pageNumbers.length - 1] < (totalPages - 1) && (
                        <span className={`px-2 ${theme.text.secondary}`}>...</span>
                    )}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className={`${buttonBaseClass} ${
                            currPage === totalPages 
                                ? buttonActiveClass 
                                : buttonInactiveClass
                        }`}
                        aria-label={`Go to page ${totalPages}`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currPage + 1)}
                disabled={currPage === totalPages}
                className={`${buttonBaseClass} ${
                    currPage === totalPages 
                        ? buttonDisabledClass 
                        : buttonInactiveClass
                }`}
                aria-label="Next page"
            >
                <span className="flex items-center gap-1">
                    {t('endUser.bills.next') || 'Next'}
                    <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                        />
                    </svg>
                </span>
            </button>
        </div>
    )
}