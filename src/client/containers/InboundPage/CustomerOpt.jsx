import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { PanelGroup } from '../../components/Bootstrap';
import CustomerInfo from '../../components/InboundPage/CustomerInfo.jsx';
import { handlerCustomerSave, handlerCustomerLoad, handleOnCustomerChange } from '../../actions/index.js';

class CustomerOpt extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlerCustomerSave = this.handlerCustomerSave.bind(this);
        this.handlerCustomerLoad = this.handlerCustomerLoad.bind(this);
        this.handleOnCustomerChange = this.handleOnCustomerChange.bind(this);
    }
    // componentWillReceiveProps(nextProps) {
    //     const {dispatch} = this.props;
    //     console.log('componentWillReceiveProps ' + nextProps );
    // }
    // componentWillUpdate(nextProps, nextState) {
    //     const {dispatch} = this.props;
    //     console.log('componentWillUpdate:' + nextProps + "nextProps " + nextProps);
    // }
    componentDidMount() {
        const {dispatch, CustomeData} = this.props;
        this.handlerCustomerLoad(CustomeData);
 
    }
    handlerCustomerSave() {
        const {dispatch, CustomeData} = this.props;
        var dd=handlerCustomerSave(CustomeData);
        dispatch(dd);
      
    }
    handlerCustomerLoad() {
        const {dispatch, CustomeData} = this.props;
        dispatch( handlerCustomerLoad(CustomeData));
        
    }
    
    handleOnCustomerChange(name, value) {
        const {dispatch, CustomeData} = this.props;
        dispatch(handleOnCustomerChange(CustomeData, name, value));
    }
    render() {
        const {CustomeData, sex, businesstype, customertype, LargeArea, cuestage, accounttype} = this.props;
        return (<Row {...this.props}>
                    <Col
                         xs={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         lg={ 12 }>
                        <Grid fluid={ true }>
                            <CustomerInfo
                                          businesstype={ businesstype }
                                          sex={ sex }
                                          customertype={ customertype }
                                          CustomeData={ CustomeData } 
                                          IntentionCity= { LargeArea }
                                          cuestage = { cuestage }
                                          accounttype ={ accounttype }
                                          handleOnCustomerSave =  { this.handlerCustomerSave }
                                          handleOnCustomerChange = { this.handleOnCustomerChange }/>
                            <PanelGroup
                                        accordion={ true }
                                        defaultActiveKey={ 1 } />
                        </Grid>
                    </Col>
                </Row>
            );
    }
}
function mapStateToProps(state) {
   // debugger;
    const {inboundData: {CustomeData, LargeArea},Option:{ sex, businesstype, customertype,accounttype,cuestage } } = state;
    //const {inboundData: {CustomeData} } = state;
    // const sex = [] ;
    // const businesstype = [];
    // const customertype= [];
    return {
        CustomeData,
        sex,
        businesstype,
        customertype,
        LargeArea,
        accounttype,
        cuestage
        
    };
}

export default connect(mapStateToProps)(CustomerOpt);
