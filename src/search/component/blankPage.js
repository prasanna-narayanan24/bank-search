import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';

class BankPage extends React.Component {
    render() {
        return <div className="container">
            <div className="row">
                <div className="col-5 text-center justify-content-center">
                    <FontAwesomeIcon icon={icons.faNewspaper} size="10x" />
                </div>
                <div className="col-7">
                    <div className="p-3">
                        <p>Oops, Seems like there's nothing to be displayed here</p>
                        <p>Try doing the following actions</p>
                        <ul>
                            <li>Select a city if you have not selected one</li>
                            <li>If the city is selected, Please try with someother city</li>
                            <li>Try changing the filters</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default BankPage;