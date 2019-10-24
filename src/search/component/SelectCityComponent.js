import React, { Component } from 'react';

class SelectCityComponent extends Component {
    render() {
        const {selectedCity, options, onCitySelect} = this.props;
        return (
            <div className="d-flex justify-content-center">
                <button className="nav-link btn btn-outline-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">{selectedCity === '' ? 'Choose city' : selectedCity}</button>
                <div className="dropdown-menu" x-placement="bottom-start" style={{ position: "absolute", transform: 'translate3d(0px, 38px, 0px)', top: 0, left: 0, willChange: 'transform' }}>
                    {options.map(option => <button className="dropdown-item" onClick={e => onCitySelect(option)} key={option}>{option}</button>)}
                </div>
            </div>
        );
    }
}

export default SelectCityComponent;