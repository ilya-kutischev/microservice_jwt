import React from 'react';


const Pagination = ({page, totalPages, changePage, getPages}) => {
    const pagesArray = getPages
    return (
        <div className="page__wrapper">
            {
                pagesArray.map(p =>
                    <span key={p} onClick={() => changePage(p)} className={p === page ? "page page__current" : "page"}>{p}</span>
                )
            }
        </div>
    );
};

export default Pagination;