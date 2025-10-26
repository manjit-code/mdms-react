import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function Pagination({ currPage, totalPages, onPageChange, maxVisiblePages = 5 }) {

    const theme = useSelector(state => state.theme.colors);
    const { t } = useTranslation();

    if (totalPages <= 1) return null;


    const generatePageNumbers = () => {
        const pageNumbers = [];

        let startPage = Math.max(1, currPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // near to end pages
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++){
             pageNumbers.push[i];
        }
        return pageNumbers;
    }

    const pageNumbers = generatePageNumbers(); // Total no of pages

    return (
        <div className={`flex flex-row justify-between`}>
            <button
                onClick={() => onPageChange(currPage - 1)}
                disabled={currPage === 1}
            >
                {t('endUser.bills.previous')}
            </button>



            <div>
                {pageNumbers[0] > 1 && (
                    <>
                    <button
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </button>
                    {pageNumbers[0] > 2 && (
                        <span>...</span>
                    )}
                    </>
                )}

                {pageNumbers.map(page =>(
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                    >

                        {page}
                    </button>
                ))}

                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                    <>
                        {pageNumbers[pageNumbers.length-1] < (totalPages - 1) && (
                            <span>...</span>
                        )}
                        <button
                            onClick={()=>onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}
            </div>



            <button
                onClick={() => onPageChange(currPage + 1)}
                disabled={currPage === totalPages}
            >
                {t('endUser.bills.next')}
            </button>
        </div>
    )
}
