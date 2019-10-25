import initialState from "./initialState";
import * as types from "../constants/BankConstants";

const showBanksMatching = (banks, value) => {
    const search = value.toLowerCase();
    if (search.length <= 0 || banks.length <= 0) {
        return banks;
    }


    return banks.filter(bank => {
        for (let key of Object.keys(bank)) {
            if (bank[key].toString().toLowerCase().includes(search))
                return true;
        }
        return false;
    });
}

const showFavouriteBanks = (nextState, banks, favFilter) => {
    if (favFilter)
        return banks.filter(bank => nextState.favourites[bank.ifsc])
    return banks;
}

const filterBanks = nextState => {
    let banks = showBanksMatching(nextState.banks, nextState.searchTerm);
    banks = showFavouriteBanks(nextState, banks, nextState.showFavourites)
    return banks;
}

const bankSearchReducer = (state = initialState, action) => {
    let nextState = Object.assign({}, initialState, state)
    nextState.error = Object.assign({}, initialState.error, nextState.error);

    switch (action.type) {
        case types.loader:
            nextState.loader = true;
            break;
        case types.unloader:
            nextState.loader = false;
            break;
        case types.handleCity:
            nextState.selectedCity = action.value;
            window.localStorage.setItem('selected-city', action.value);
            break;
        case types.fetchBanksSuccess:
            nextState.banks = action.value;
            nextState.cache[nextState.selectedCity.toUpperCase()] = action.value
            nextState.displayingBanks = filterBanks(nextState);
            break;
        case types.fetchBankFailed:
            nextState.error.hasError = true;
            nextState.error.message = action.value;
            break;
        case types.handleSearch:
            nextState.searchTerm = action.value;
            nextState.displayingBanks = filterBanks(nextState);
            break;
        case types.updateFavourites:
            let favourites = window.localStorage.getItem('favourites');
            if (favourites) {
                for (let f of favourites.split(",")) {
                    nextState.favourites[f.toString()] = true;
                }
            }
            nextState = { ...nextState }
            break;
        case types.togglFavourite:
            nextState.favourites[action.value] = !!!nextState.favourites[action.value]
            if (!nextState.favourites[action.value]) {
                delete nextState.favourites[action.value]
                nextState.displayingBanks = filterBanks(nextState);
            }
            window.localStorage.setItem('favourites', Object.keys(nextState.favourites));
            nextState = { ...nextState };
            break;
        case types.toggleShowFavourite:
            nextState.showFavourites = !nextState.showFavourites;
            nextState.displayingBanks = filterBanks(nextState);
            break;
        default:
            return nextState;
    }
    return nextState;
}
export default bankSearchReducer;