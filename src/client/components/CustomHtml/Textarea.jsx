import React, { Component, PropTypes } from 'react';

class Textarea extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        return (
          <textarea
                       {...this.props}
                       type="textarea"
                       className="form-control" >
                       </textarea>
            );
    }
}
export default Textarea;
