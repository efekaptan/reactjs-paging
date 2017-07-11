'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./Paging.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paging = function (_React$Component) {
    _inherits(Paging, _React$Component);

    function Paging() {
        _classCallCheck(this, Paging);

        return _possibleConstructorReturn(this, (Paging.__proto__ || Object.getPrototypeOf(Paging)).apply(this, arguments));
    }

    _createClass(Paging, [{
        key: 'getPages',
        value: function getPages() {
            var pages = [];
            var currentPage = parseInt(this.props.pageIndex, 10);
            var totalPages = Math.ceil(this.props.totalCount / this.props.pageSize);
            var groupSize = parseInt(this.props.groupSize, 10);
            var navSize = parseInt(this.props.navSize, 10);

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
                    this.addEndNavigation(pages, totalPages, navSize);
                }
                //Current page is in last group Ex : 1,2 .. 5,6,7,8,9
                else if (currentPage - 1 >= totalPages - groupSize + 1) {
                        this.addBeginningNavigation(pages, navSize);

                        for (var _i2 = totalPages - groupSize + 1; _i2 <= totalPages; _i2++) {
                            pages.push(_i2);
                        }
                    }
                    //Display pages for middle group Ex : 1,2 .. 4,5,6,7,8 .. 11,12
                    else {
                            this.addBeginningNavigation(pages, navSize);

                            //Calculate center to distrubute equal size of pages around middle page
                            var center = Math.ceil((groupSize - 1) / 2);

                            for (var _i3 = currentPage - center; _i3 <= currentPage + center; _i3++) {
                                pages.push(_i3);
                            }
                            this.addEndNavigation(pages, totalPages, navSize);
                        }

            return pages;
        }
    }, {
        key: 'addBeginningNavigation',
        value: function addBeginningNavigation(pages, navSize) {
            for (var i = 1; i <= navSize; i++) {
                pages.push(i);
            }
            pages.push('');
            return pages;
        }
    }, {
        key: 'addEndNavigation',
        value: function addEndNavigation(pages, totalPages, navSize) {
            pages.push('');
            for (var i = totalPages - navSize + 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var pages = this.getPages();
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
                        var isCurrentPage = parseInt(_this2.props.pageIndex, 10) === page;

                        return _react2.default.createElement(
                            'li',
                            { key: index, className: 'page-item' + (isCurrentPage ? ' active' : null) },
                            _react2.default.createElement(
                                'a',
                                { style: { cursor: "pointer" }, onClick: function onClick() {
                                        return _this2.props.onClick(page);
                                    } },
                                page
                            )
                        );
                    }
                })
            );
        }
    }]);

    return Paging;
}(_react2.default.Component);

Paging.defaultProps = {
    pageIndex: 1,
    pageSize: 10,
    groupSize: 10,
    navSize: 1
};
Paging.propTypes = {
    pageIndex: _propTypes2.default.any.isRequired,
    totalCount: _propTypes2.default.any.isRequired
};
exports.default = Paging;