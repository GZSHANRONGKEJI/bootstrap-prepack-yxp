import React, { Component, PropTypes } from 'react';

class crmInputForm extends Component {

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
        const { hasFeedback, required, style } = this.props;
        let className = (this.props.className || '') +  ' form-group field';
        className += hasFeedback ? ' has-feedback' : "";
        className += required ? ' required' : "";
        const styleStr = Object.assign({}, style, { marginBottom: '6px' });
        return (<div
                       {...this.props}
                       style = { styleStr }
                       className = { className }>
                       { this.renderChildren() }
                </div>
            );
    }
}

crmInputForm.defaultProps = {
    hasFeedback: true,
    required: false
};
crmInputForm.propTypes = {
    hasFeedback: PropTypes.bool,
    required: PropTypes.bool
};
export default crmInputForm;
