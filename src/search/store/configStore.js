import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducers/index";

/** 
 * This config store provides configuration props to the react components
 * Thunk is used as middleware
 * maps reducer with props from api's
 */
const configureStore = (props) => (
  createStore(rootReducer, props, applyMiddleware(thunk))
);

export default configureStore;