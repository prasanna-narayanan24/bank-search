import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from "@fortawesome/free-solid-svg-icons";

class Pagination extends React.Component {
    range(start, count) {
        return Array.apply(0, Array(count))
            .map((element, index) => index + start);
    }

    abs = num => {
        return num > 0 ? num : num*-1;
    }

    getStartPage = (currentPage, visiblePageRange) => {
        let mod = (currentPage - 1) % visiblePageRange;
        if(mod === 0) {
            return currentPage;
        }

        return this.abs(mod - (visiblePageRange - mod));
    }

    render() {
        const { totalSize, size } = this.props;
        let {currentPage} = this.props;
        const { handleSize } = this.props;
        let pageCount = totalSize / size | (totalSize > 0 ? 1 : 0);

        const visiblePageRange = 5;
        currentPage = currentPage < pageCount ? currentPage : pageCount;
        let visibleRange = (currentPage + visiblePageRange) < pageCount ? visiblePageRange : (pageCount - currentPage + 1);
        let pageNumbers = this.range(currentPage, visibleRange);

        if (pageCount <= visiblePageRange) {
            return null;
        }

        return (
            <div className="d-flex flex-row flex-wrap justify-content-between">
                <div className="d-inline-block mb-lg-2">
                    <div className="btn-group">
                        <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">{size}</button>
                        <span className="p-2">of {totalSize} results</span>
                        <div className="dropdown-menu">
                            {this.props.showOptions.map(option => <button
                                onClick={e => handleSize(option)}
                                key={option}
                                className="dropdown-item">
                                {option}
                            </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="First group">
                        <button type="button" onClick={e => this.props.onPrevPage()} className="btn btn-success" disabled={(currentPage - visiblePageRange) <= 0}><FontAwesomeIcon icon={icons.faArrowLeft} /></button>
                        {
                            pageNumbers.map(page => <button key={page} onClick={e => this.props.onPage(page)} className={`btn btn-secondary ${ currentPage === page ? "active": "" }`}>{page}</button>)
                        }
                        <button type="button" onClick={e => this.props.onNextPage()} className="btn btn-success" disabled={(currentPage + visiblePageRange) >= pageCount}><FontAwesomeIcon icon={icons.faArrowRight} /></button>
                    </div>
                </div>
            </div>
        );
    }
}

Pagination.defaultProps = {
    showOptions: [5, 10, 50]
}

export default Pagination;