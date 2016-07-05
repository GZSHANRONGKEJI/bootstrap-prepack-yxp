import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SalesFollowTask from '../../components/InboundPage/SalesFollowTask.jsx';
import { handleOnSalesFollowTaskChange, handleOnSalesFollowTaskSave, handleOnSalesFollowTaskCustomerChange, handleOnSalesFollowTaskLoad } from '../../actions/index.js';
import common from '../../common/common.js';

class SalesFollowTaskTab extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnCustomerChange = this.handleOnCustomerChange.bind(this);
        if(common.getTemp().entityName === 'phonecall') {
           
            window.parent.Xrm.Page.getAttribute('xin_customerid').addOnChange(()=>{
                var id = common.getCrmEntityAttr('xin_customerid');
                this.handleOnCustomerChange(id);

            }, false);//绑定字段更改事件
            var id = common.getCrmEntityAttr('xin_customerid');
            this.handleOnCustomerChange(id);
        }
    }
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(handleOnSalesFollowTaskLoad());
         
    }
    handleOnChange(name, value) {
        const {dispatch} = this.props;
        dispatch(handleOnSalesFollowTaskChange(name, value));
    }
    handleOnSave() {
        const {dispatch, item} = this.props;
        dispatch(handleOnSalesFollowTaskSave(item));
    }
    handleOnCustomerChange(id) {
        const {dispatch} = this.props;
        if(!id) {
          this.handleOnChange('isconversion', true);
        }
        dispatch(handleOnSalesFollowTaskCustomerChange(id));

    }
    render() {
        const {item, followresultList, sex, businesstype, customertype, LargeArea, cuestage, accounttype} = this.props;
        return (<div {...this.props}> 
                        <SalesFollowTask
                                 {...this.props}
                                 businesstype={ businesstype }
                                 sex={ sex }
                                 customertype={ customertype }
   
                                 IntentionCity= { LargeArea }
                                 cuestage = { cuestage }
                                 accounttype ={ accounttype }
                                 handleOnChange={ this.handleOnChange }
                                 handleOnSave={ this.handleOnSave }
                                 followresultList = { followresultList }
                                 item={ item } />
            </div>);
    }
}
function mapStateToProps(state) {

    const {salesFollowTaskTab : { item, LargeArea }, Option:{ followresultList, sex, businesstype, customertype,accounttype,cuestage } } = state;
    return {
        item,
        LargeArea,
        followresultList,
        sex,
        businesstype,
        customertype,
        accounttype,
        cuestage
    };
}

export default  connect(mapStateToProps)(SalesFollowTaskTab);
