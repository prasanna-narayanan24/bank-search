import BankAPI from "../../services/bank.api";
import * as types from "../constants/BankConstants";


const loader = () => ({ type: types.loader });
const unloader = () => ({ type: types.unloader });

const onFetchSuccess = data => ({
    type: types.fetchBanksSuccess,
    value: data
});

const onFetchFailed = error => ({
    type: types.fetchBankFailed,
    value: error
});

export const handleCity = city => ({
    type: types.handleCity,
    value: city,
});

export const handleSearch = term => ({
    type: types.handleSearch,
    value: term
});

export const toggleFavourite = bank => ({
    type: types.togglFavourite,
    value: bank
});

export const updateFavourites = () => ({
    type: types.updateFavourites
});

export const toggleShowFavourite = () => ({
    type: types.toggleShowFavourite
});

export const unsetError = () => ({
    type: types.unsetError
})

export const fetchBanks = (cache, city) => {
    if (city == null || city.length <= 0) {
        return dispatch => dispatch(unloader());
    }
    return dispatch => {
        dispatch(loader())
        if (cache[city]) {
            dispatch(unloader())
            return dispatch(onFetchSuccess(cache[city]));
        } else
            return BankAPI.fetchBanks(
                { city },
                res => {
                    dispatch(unloader());
                    dispatch(onFetchSuccess(res));
                },
                e => {
                    dispatch(unloader());
                    dispatch(onFetchFailed(e));
                }
            );
    }
}