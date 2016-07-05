import React, { Component, PropTypes } from 'react';

class CrmInput extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        return (<div className = 'input-group-sm field' style =  { { 'marginBottom' : "0px" } }>
                 <input
                       {...this.props}
                       type="text" 
                       className='form-control' />
                  <span className="form-control-feedback"/>
                </div>
            );
    }
}


export default CrmInput;
