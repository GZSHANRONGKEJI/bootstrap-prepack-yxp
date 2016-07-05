
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import InboundTabs from '../containers/InboundPage/InboundTabs.jsx';


class ProblemRecordPage extends Component {

    render() {
        return (
            <div>
                <Grid fluid={ true } params={ this.props.params }>
                    <InboundTabs params={ this.props.params }></InboundTabs>
                </Grid>
            </div>
            );
    }
}

export default ProblemRecordPage;

