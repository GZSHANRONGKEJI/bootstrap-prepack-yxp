import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tab } from 'react-bootstrap';
import CrmScrollTable from '../../components/CrmWeb/CrmScrollTable.jsx';
import CustomerVipQuery from '../../components/InboundPage/CustomerVipQuery.jsx';
import { handlerOnCustomerVipQuery, handlerOnCustomerVipChange } from '../../actions/index.js';
import EventEmitter from '../../common/eventemitter';
import ReactDOM from 'react-dom';
import common from '../../common/common.js';
class CustomerVip extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlerOnQuery = this.handlerOnQuery.bind(this);
        this.handlerOnCustomerVipChange = this.handlerOnCustomerVipChange.bind(this);
        this.onCustomerVipChange = this.onCustomerVipChange.bind(this);
        this.onCustomerVipChangeEnvent = this.onCustomerVipChangeEnvent.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
    }
    componentDidUpdate(prevProps, prevState) {
        const {dispatch, itemData} = this.props;
        var _common = common;
        if(itemData.length > 0 ) {
        var td = $(ReactDOM.findDOMNode(this.refs.Table)).find('tbody>tr').find('td:first').toArray();
        td.forEach(function(t, index){
            var i =  itemData[index];
            var a = $('<a href="javasctipt:void(0)">'+ $(t).text() +'</a>');
            a.click(function() {
                _common.crmopen(i.customerid, '10044');
            })
            $(t).html(a);
         });
        }
    }
    componentDidMount() {
        const {dispatch, query} = this.props;

        EventEmitter.on('onCustomerVipChangeEnvent', this.onCustomerVipChangeEnvent);
    }
    onCustomerVipChangeEnvent(phone) {
        const {query} = this.props;
        query.phone = phone;
        query.currentpage = 1;
        this.handlerOnQuery();
    }
    onCustomerVipChange(phone) {
        const {query} = this.props;
        query.phone = phone;
        this.handlerOnQuery();
    }
    handlerOnQuery() {
        const {dispatch, query} = this.props;
        dispatch(handlerOnCustomerVipQuery(query));
    }
    handlerOnCustomerVipChange(name, value) {
        const {dispatch} = this.props;
        dispatch(handlerOnCustomerVipChange(name, value));     
    }

    render() {
        const {query, itemData, item} = this.props;
        return (<div>
                    <CustomerVipQuery handlerOnCustomerVipChange = { this.handlerOnCustomerVipChange }
                                      query={ query }
                                      handleOnQuery={ this.handlerOnQuery } />
                    <Row>
                        <Col
                             xs={ 12 }

                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }>
                            <CrmScrollTable  item = { item } itemData={ itemData }  ref = "Table"/>
                        </Col>
                    </Row>
                </div>
            );
    }
}
function mapStateToProps(state) {
    const {CustomerVip: {query, itemData, item}} = state;
    return {
        item,
        query,
        itemData
    };
}

export default connect(mapStateToProps)(CustomerVip);
