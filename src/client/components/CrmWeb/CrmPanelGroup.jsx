import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Panel, Input } from 'react-bootstrap';
import { PanelGroup } from '../Bootstrap';

class CrmPanelGroup extends Component {

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
        const {header, formname, bsStyle} = this.props;
//                            defaultActiveKey={ 1 }
        return (<PanelGroup
                            {...this.props}
                            accordion={ true }>
                    <Panel
                           header={ header }
                           eventKey={ 1 }
                           bsStyle = { bsStyle }>
                        <form className="form-horizontal ui form" name = { formname } >
                            <Grid fluid={ true }>
                                {this.renderChildren()}
                            </Grid>
                        </form>
                    </Panel>
                </PanelGroup>
            );
    }
}
CrmPanelGroup.defaultProps = {
    formname: '',
    bsStyle: 'primary'
};
CrmPanelGroup.propTypes = {
    header: PropTypes.string,
    formname: PropTypes.string,
    bsStyle: PropTypes.string
};

export default CrmPanelGroup;
