import React, { useEffect, useState } from 'react';

export const CircularPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const pages = Math.ceil(totalItems / itemsPerPage);
        setPageCount(pages);
    }, [totalItems, itemsPerPage]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < pageCount) {
            onPageChange(page);
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 0; i < pageCount; i++) {
            buttons.push(
                <button
                    key={i}
                    className={i === currentPage ? 'active' : ''}
                    onClick={() => handlePageChange(i)}
                >
                    {i + 1}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            {renderPaginationButtons()}
            <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
    );
};
