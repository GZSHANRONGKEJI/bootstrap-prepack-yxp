import React, { Component, PropTypes } from 'react';

class CrmLabel extends Component {

    constructor(props, content) {
        super(props, content);
    }
    renderChildren(){
        let eventKeyCount = 0;
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {eventKey: ++eventKeyCount});
        });
    }
    render() {
        const {label, labelClassName} = this.props;
        let classNameStr='control-label ' + labelClassName;
        return (<label
                       {...this.props}
                       className={ classNameStr } >
                       <span>{ label }</span>
                       { this.renderChildren() }
                </label>
            );
    }
}

CrmLabel.defaultProps = {
    labelClassName: 'col-xs-3',
    label: '标签'
};
CrmLabel.propTypes = {
    label: PropTypes.string,
    labelClassName: PropTypes.string
};
export default CrmLabel;
