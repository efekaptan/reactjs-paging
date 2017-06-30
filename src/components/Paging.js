import React from 'react';
import './Paging.css';

const Paging = ({ pageIndex = 1, groupSize = 10, navSize = 1, totalCount, pageSize = 10, onClick }) => {
    const currentPage = parseInt(pageIndex, 10);
    const totalPages = Math.ceil(totalCount / pageSize);
    groupSize = parseInt(groupSize, 10);
    navSize = parseInt(navSize, 10);
    let pages = [];

    if (totalPages <= 1) {
        return null;
    }

    //Until (group size + nav size) pages there is no need for grouping Ex : 1,2,3,4,5,6,7
    if (totalPages < groupSize + navSize) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    }
    //Current page is in first group Ex : 1,2,3,4,5 .. 8,9
    else if (currentPage < groupSize) {
        for (let i = 1; i <= groupSize; i++) {
            pages.push(i);
        }
        GetLastPages();
    }
    //Current page is in last group Ex : 1,2 .. 5,6,7,8,9
    else if (currentPage - 1 >= totalPages - groupSize + 1) {
        GetFirstPages();

        for (let i = totalPages - groupSize + 1; i <= totalPages; i++) {
            pages.push(i);
        }
    }
    //For middle group, display pages Ex : 1,2 .. 4,5,6,7,8 .. 11,12
    else {
        GetFirstPages();

        //Center calculated to distrubute equal size of pages around middle page
        const center = Math.ceil((groupSize - 1) / 2);

        for (let i = currentPage - center; i <= currentPage + center; i++) {
            pages.push(i);
        }
        GetLastPages();
    }

    function GetFirstPages() {
        for (let i = 1; i <= navSize; i++) {
            pages.push(i);
        }
        pages.push('');
    }

    function GetLastPages() {
        pages.push('');
        for (let i = totalPages - navSize + 1; i <= totalPages; i++) {
            pages.push(i);
        }
    }

    return (
        <ul className="pagination" >
            {
                pages.map((page, index) => {
                    if (page === '') {
                        return <li key={index}><a>...</a></li>
                    }
                    else {
                        return <li key={index} className={currentPage === page ? 'active' : null}>
                            <a style={{ cursor: "pointer" }} onClick={() => onClick(page)}>
                                {page}
                            </a>
                        </li>
                    }
                })
            }
        </ul >
    )
}

export default Paging;