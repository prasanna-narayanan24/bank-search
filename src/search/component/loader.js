import React, { Component } from 'react';

class Loader extends Component {
    render() {
        return (
            <div className="text-center">
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default Loader;

