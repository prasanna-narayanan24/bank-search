import React, { Component } from 'react';
import BlankPage from "./blankPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import Pagination from './pagination';

class BankList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            size: 10,
            page: 1,
            startIndex: 0,
            endIndex: 10,
        }
    }

    updateIndex = () => {
        const { page, size } = this.state;
        const startIndex = size * (page - 1);
        const endIndex = startIndex + size;

        this.setState({startIndex, endIndex});
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.showFavourites !== this.props.showFavourites) {
            this.setState({page: 1, size: 10}, this.updateIndex)
        }
    }

    onNextPage = () => {
        this.setState({ ...this.state, page: this.state.page + 5 }, this.updateIndex);
    }

    onPrevPage = () => {
        this.setState({ ...this.state, page: this.state.page - 5 }, this.updateIndex);
    }

    onPage = page => {
        this.setState({page}, this.updateIndex);
    }

    handleSizeChange = size => {
        this.setState({
            size,
            page: 1
        }, this.updateIndex);
    }

    renderFavIcon = bank => {
        if (this.props.favourites[bank.ifsc] !== undefined && this.props.favourites[bank.ifsc])
            return <td onClick={e => this.props.toggleFavourite(bank.ifsc)} className=""><FontAwesomeIcon icon={icons.faHeart} className="cursor-pointer text-danger" /></td>
        else
            return <td onClick={e => this.props.toggleFavourite(bank.ifsc)} className=""><FontAwesomeIcon className="cursor-pointer" icon={icons.faHeartBroken} /></td>
    }

    renderBanks = banks => {
        return (
            <React.Fragment>
                <table className="table table-dark table-responsive-lg">
                    <thead>
                        <tr>
                            <th>IFSC</th>
                            <th>Bank name</th>
                            <th>Branch</th>
                            <th colSpan="3">
                                <input onChange={this.props.handleShowFavourites} type="checkbox" className="form-check-input" checked={this.props.showFavourites} /> Favourites
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            banks.length > 0 ?
                                banks.slice(this.state.startIndex, this.state.endIndex).map(bank => {
                                    return (
                                        <tr key={`bank-${bank.ifsc}-${bank.id}`}>
                                            <td>{bank.ifsc}</td>
                                            <td>{bank.bank_name}</td>
                                            <td>{bank.branch}</td>
                                            {this.renderFavIcon(bank)}
                                        </tr>
                                    );
                                }) :
                                <tr><td className="bg-warning text-center" colSpan="6">no results</td></tr>
                        }
                    </tbody>
                </table>
                <Pagination
                    totalSize={banks.length}
                    size={this.state.size}
                    handleSize={this.handleSizeChange}
                    currentPage={this.state.page}
                    onNextPage={this.onNextPage}
                    onPrevPage={this.onPrevPage}
                    onPage={this.onPage}
                />
            </React.Fragment>
        );
    }

    renderNoBanks = () => {
        return <BlankPage />
    }

    render() {
        const { banks } = this.props;
        return (banks != null && banks.length > 0) || this.props.showFavourites ? this.renderBanks(banks) : this.renderNoBanks();
    }
}

export default BankList;