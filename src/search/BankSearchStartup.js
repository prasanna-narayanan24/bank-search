import React from 'react';
import { Provider } from 'react-redux';
import configStore from "./store/configStore";
import BankSearchIndexContainer from './container/BankSearchIndexContainer';

const BankSearchStartup = props => (
    /** spread the props from initial state to the container  */
    <Provider store={configStore(props)}>
        <BankSearchIndexContainer {...props} />
    </Provider>
);

export default BankSearchStartup;