import React from 'react';

class SearchComponent extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <input
                    value={this.props.value}
                    onChange={e => this.props.onChange(e.target.value)}
                    placeholder="Search" 
                    className="form-control" 
                />
            </div>
        );
    }
}

export default SearchComponent;