import React, { Component } from 'react';
import SelectCityComponent from './SelectCityComponent';
import BankList from './BankList';
import SearchComponent from './SearchComponent';
import Loader from './loader';

class BankSearchIndex extends Component {
    /**
     * Index page comprising of different components
     * Components:
     *      SearchComponent         -> Form to listen for search term
     *      SelectCityComponent     -> Dropdown component to provide an option choose city
     *      BankList                -> List of banks matching the criteria
     */
    componentDidMount() {
        // get the last selected city of the user
        let city = window.localStorage.getItem('selected-city');
        if(city.length > 0) {
            this.handleCity(city);
        }
        this.props.actions.updateFavourites(); // update the favourite list from local
    }

    /** Handles as well as fetched bank based on city selection */
    handleCity = city => {
        this.props.actions.handleCity(city);
        this.props.actions.fetchBanks(this.props.bankSearch.cache, city.toUpperCase());
    }

    /** Filters banks based on search term */
    handleSearch = term => {
        this.props.actions.handleSearch(term);
    }

    /** Toggles between show favourites */
    handleShowFavourites = e => {
        this.props.actions.toggleShowFavourite();
    }

    render() {
        return (
            <React.Fragment>
                <div className="content-body">
                    <SelectCityComponent
                        selectedCity={this.props.bankSearch.selectedCity}
                        onCitySelect={this.handleCity}
                        options={this.props.bankSearch.availableCities}
                    />
                    <div className="mt-3">
                        <SearchComponent 
                            value={this.props.bankSearch.searchTerm}
                            onChange={this.handleSearch}
                        />
                    </div>
                    <div className="mt-3">
                        {
                            this.props.bankSearch.loader ? 
                                <Loader /> : 
                                <BankList 
                                    banks={this.props.bankSearch.displayingBanks}
                                    showFavourites={this.props.bankSearch.showFavourites}
                                    favourites={this.props.bankSearch.favourites}
                                    toggleFavourite={this.props.actions.toggleFavourite}
                                    handleShowFavourites={this.handleShowFavourites}
                                />
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BankSearchIndex;