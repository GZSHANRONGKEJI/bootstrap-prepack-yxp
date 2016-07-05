import React, { Component, PropTypes } from 'react';

class CrmInputDiv extends Component {

    constructor(props, content) {
        super(props, content);
    }

    renderChildren() {
        let eventKeyCount = 0;
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {eventKey: ++eventKeyCount});
        });{ this.renderChildren() }
    }
    render() {

        const { className } = this.props;
        return (<span
                       {...this.props}
                       className = { className }>
                    { this.renderChildren() }
                </span>
            );
    }
}

CrmInputDiv.defaultProps = {
    className: 'col-xs-9'
};
CrmInputDiv.propTypes = {
    className: PropTypes.string
};
export default CrmInputDiv;

