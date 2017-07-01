import React from 'react';
import PropTypes from 'prop-types';
import './Paging.css';

class Paging extends React.Component {
    static defaultProps = {
        pageIndex: 1,
        pageSize: 10,
        groupSize: 10,
        navSize: 1
    }

    static propTypes = {
        pageIndex: PropTypes.any.isRequired,
        totalCount: PropTypes.any.isRequired,
    }

    getPages() {
        let pages = [];
        const currentPage = parseInt(this.props.pageIndex, 10);
        const totalPages = Math.ceil(this.props.totalCount / this.props.pageSize);
        const groupSize = parseInt(this.props.groupSize, 10);
        const navSize = parseInt(this.props.navSize, 10);

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
            this.addEndNavigation(pages, totalPages, navSize);
        }
        //Current page is in last group Ex : 1,2 .. 5,6,7,8,9
        else if (currentPage - 1 >= totalPages - groupSize + 1) {
            this.addBeginningNavigation(pages, navSize);

            for (let i = totalPages - groupSize + 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        //Display pages for middle group Ex : 1,2 .. 4,5,6,7,8 .. 11,12
        else {
            this.addBeginningNavigation(pages, navSize);

            //Calculate center to distrubute equal size of pages around middle page
            const center = Math.ceil((groupSize - 1) / 2);

            for (let i = currentPage - center; i <= currentPage + center; i++) {
                pages.push(i);
            }
            this.addEndNavigation(pages, totalPages, navSize);
        }

        return pages;
    }

    addBeginningNavigation(pages, navSize) {
        for (let i = 1; i <= navSize; i++) {
            pages.push(i);
        }
        pages.push('');
        return pages;
    }

    addEndNavigation(pages, totalPages, navSize) {
        pages.push('');
        for (let i = totalPages - navSize + 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }

    render() {
        const pages = this.getPages();
        return (
            <ul className="pagination" >
                {
                    pages.map((page, index) => {
                        if (page === '') {
                            return <li key={index}><a>...</a></li>
                        }
                        else {
                            const isCurrentPage = parseInt(this.props.pageIndex, 10) === page;

                            return <li key={index} className={isCurrentPage ? 'active' : null}>
                                <a style={{ cursor: "pointer" }} onClick={() => this.props.onClick(page)}>
                                    {page}
                                </a>
                            </li>
                        }
                    })
                }
            </ul >
        )
    }
}

export default Paging;