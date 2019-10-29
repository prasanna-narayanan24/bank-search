import initialState from "./initialState";
import * as types from "../constants/BankConstants";

const showBanksMatching = (banks, value) => {
    const search = value.toLowerCase();
    if (search.length <= 0 || banks.length <= 0) {
        return banks;
    }

    return banks.filter(bank => {
        // For any of the key that matches the given search term
        for (let key of Object.keys(bank)) {
            if (bank[key].toString().toLowerCase().includes(search))
                return true;
        }
        return false;
    });
}

const showFavouriteBanks = (newState, banks, favFilter) => {
    if (favFilter)
        return banks.filter(bank => newState.favourites[bank.ifsc])
    return banks;
}

const filterBanks = newState => {
    let banks = showBanksMatching(newState.banks, newState.searchTerm);
    banks = showFavouriteBanks(newState, banks, newState.showFavourites)
    return banks;
}

const bankSearchReducer = (state = initialState, action) => {
    let newState = Object.assign({}, initialState, state)
    newState.error = Object.assign({}, initialState.error, newState.error);

    switch (action.type) {
        case types.loader:
            newState.loader = true;
            break;
        case types.unloader:
            newState.loader = false;
            break;
        case types.handleCity:
            newState.selectedCity = action.value;
            window.localStorage.setItem('selected-city', action.value);
            break;
        case types.fetchBanksSuccess:
            newState.banks = action.value;
            newState.cache[newState.selectedCity.toUpperCase()] = action.value
            newState.displayingBanks = filterBanks(newState);
            break;
        case types.fetchBankFailed:
            let error = {
                hasError: true,
                errorCode: action.value.status,
                message: action.value.responseText
            }
            newState = { ...newState, error }
            break;
        case types.unsetError:
            newState.error = { ...initialState.error }
            break;
        case types.handleSearch:
            newState.searchTerm = action.value;
            newState.displayingBanks = filterBanks(newState);
            break;
        case types.updateFavourites:
            let favourites = window.localStorage.getItem('favourites');
            if (favourites) {
                for (let f of favourites.split(",")) {
                    newState.favourites[f.toString()] = true;
                }
            }
            newState = { ...newState }
            break;
        case types.togglFavourite:
            newState.favourites[action.value] = !!!newState.favourites[action.value]
            if (!newState.favourites[action.value]) {
                delete newState.favourites[action.value]
                newState.displayingBanks = filterBanks(newState);
            }
            window.localStorage.setItem('favourites', Object.keys(newState.favourites));
            newState = { ...newState };
            break;
        case types.toggleShowFavourite:
            newState.showFavourites = !newState.showFavourites;
            newState.displayingBanks = filterBanks(newState);
            break;
        default:
            return newState;
    }
    return newState;
}
export default bankSearchReducer;