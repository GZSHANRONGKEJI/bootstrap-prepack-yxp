
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import CallInfoRow from '../containers/InboundPage/CallInfoRow.jsx';
import CustomerOpt from '../containers/InboundPage/CustomerOpt.jsx';
import CustomerVip from '../containers/InboundPage/CustomerVip.jsx';
import InboundTabs from '../containers/InboundPage/InboundTabs.jsx';


class Inbound extends Component {

    render() {
        return (
            <div>
                <Grid fluid={ true }
                      style={ {    marginTop: '10px',    marginLeft: '20px',    marginRight: '20px'} }
                      params={ this.props.params }>
                    <CallInfoRow params={ this.props.params }></CallInfoRow>
                    <CustomerOpt defaultActiveKey={ 3 } params={ this.props.params }></CustomerOpt>
                    <Row params={ this.props.params }>
                        <Col xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }
                             params={ this.props.params }>
                            <CustomerVip params={ this.props.params }></CustomerVip>
                        </Col>
                    </Row>
                    <Row style={ {    marginBottom: '50px'} } params={ this.props.params }>
                        <Col xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }
                             params={ this.props.params }>
                            <InboundTabs defaultActiveKey={ 3 }
                                         style={ {    marginTop: '-10px'} }
                                         params={ this.props.params }></InboundTabs>
                        </Col>
                    </Row>
                </Grid>
            </div>
            );
    }
}

export default Inbound;

