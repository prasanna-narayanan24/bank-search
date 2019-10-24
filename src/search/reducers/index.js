import {combineReducers} from 'redux';
import bankSearchReducer from './bankSearchReducer';

/** combine reducer to map multiple reducers */
const rootReducer = combineReducers({bankSearch: bankSearchReducer});

export default rootReducer;