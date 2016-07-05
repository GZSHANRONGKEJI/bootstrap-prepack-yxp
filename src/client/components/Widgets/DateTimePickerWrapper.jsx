import React, { Component, PropTypes } from 'react';
import { DateTimePicker } from 'react-widgets';

class DateTimePickerWrapper extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
    	let dtPricker;
    	if(this.props.value) {
    		dtPricker = (<DateTimePicker {...this.props}  value = { new Date(this.props.value) }/>)
    	}
    	else {
    		dtPricker = (<DateTimePicker {...this.props} defaultValue={new Date()} />)
    	}
        return dtPricker;
    }
}

export default DateTimePickerWrapper;
