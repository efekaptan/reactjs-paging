'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./Paging.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paging = function Paging(_ref) {
    var _ref$pageIndex = _ref.pageIndex,
        pageIndex = _ref$pageIndex === undefined ? 1 : _ref$pageIndex,
        _ref$groupSize = _ref.groupSize,
        groupSize = _ref$groupSize === undefined ? 10 : _ref$groupSize,
        _ref$navSize = _ref.navSize,
        navSize = _ref$navSize === undefined ? 1 : _ref$navSize,
        totalCount = _ref.totalCount,
        _ref$pageSize = _ref.pageSize,
        pageSize = _ref$pageSize === undefined ? 10 : _ref$pageSize,
        _onClick = _ref.onClick;

    var currentPage = parseInt(pageIndex, 10);
    var totalPages = Math.ceil(totalCount / pageSize);
    groupSize = parseInt(groupSize, 10);
    navSize = parseInt(navSize, 10);
    var pages = [];

    if (totalPages <= 1) {
        return null;
    }

    //Until (group size + nav size) pages there is no need for grouping Ex : 1,2,3,4,5,6,7
    if (totalPages < groupSize + navSize) {
        for (var i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    }
    //Current page is in first group Ex : 1,2,3,4,5 .. 8,9
    else if (currentPage < groupSize) {
            for (var _i = 1; _i <= groupSize; _i++) {
                pages.push(_i);
            }
            GetLastPages();
        }
        //Current page is in last group Ex : 1,2 .. 5,6,7,8,9
        else if (currentPage - 1 >= totalPages - groupSize + 1) {
                GetFirstPages();

                for (var _i2 = totalPages - groupSize + 1; _i2 <= totalPages; _i2++) {
                    pages.push(_i2);
                }
            }
            //For middle group, display pages Ex : 1,2 .. 4,5,6,7,8 .. 11,12
            else {
                    GetFirstPages();

                    //Center calculated to distrubute equal size of pages around middle page
                    var center = Math.ceil((groupSize - 1) / 2);

                    for (var _i3 = currentPage - center; _i3 <= currentPage + center; _i3++) {
                        pages.push(_i3);
                    }
                    GetLastPages();
                }

    function GetFirstPages() {
        for (var _i4 = 1; _i4 <= navSize; _i4++) {
            pages.push(_i4);
        }
        pages.push('');
    }

    function GetLastPages() {
        pages.push('');
        for (var _i5 = totalPages - navSize + 1; _i5 <= totalPages; _i5++) {
            pages.push(_i5);
        }
    }

    return _react2.default.createElement(
        'ul',
        { className: 'pagination' },
        pages.map(function (page, index) {
            if (page === '') {
                return _react2.default.createElement(
                    'li',
                    { key: index },
                    _react2.default.createElement(
                        'a',
                        null,
                        '...'
                    )
                );
            } else {
                return _react2.default.createElement(
                    'li',
                    { key: index, className: currentPage === page ? 'active' : null },
                    _react2.default.createElement(
                        'a',
                        { style: { cursor: "pointer" }, onClick: function onClick() {
                                return _onClick(page);
                            } },
                        page
                    )
                );
            }
        })
    );
};

exports.default = Paging;