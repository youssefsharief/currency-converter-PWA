import React from 'react'
import PropTypes from 'prop-types';

export default class DefaultInput extends React.Component {
    render() {
        return (
            <div className="form-group mb-2">
                    {this.props.children}
                    {/* {
                        this.props.isDisplayingErrorMessage &&
                        <p test-id="errorMessage" className="form-text text-danger"> {this.props.errorMessage} </p>
                    } */}
            </div>
        )
    }
}

DefaultInput.propTypes = {
    label: PropTypes.string,
    isDisplayingErrorMessage: PropTypes.bool,
    errorMessage: PropTypes.string,
    children: PropTypes.any.isRequired
}

