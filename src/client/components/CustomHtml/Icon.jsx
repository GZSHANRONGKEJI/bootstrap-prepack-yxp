import React, { Component, PropTypes } from 'react';

class Icon extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const { className, label, iconclassName } = this.props;
        return (<a 
                       {...this.props}
                       className = { className }
                       href="javascript:void(0)">
                     <i className = { iconclassName }></i> { label }
                </a>
            );
    }
}
Icon.defaultProps = {
    className: 'btn',
    iconclassName: 'fa',
    label: ''
};
Icon.propTypes = {
    className: PropTypes.string,
    iconclassName: PropTypes.string,
    label: PropTypes.string
};

export default Icon;
