import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import CrmScrollTable from '../../components/CrmWeb/CrmScrollTable.jsx';
import { handlerOnCallRecordQuery, handlerOnCallRecordsChange } from '../../actions/index.js';
import InboundRecordQuery from '../../components/InboundPage/InboundRecordQuery.jsx';
import EventEmitter from '../../common/eventemitter';
var clearFun;
class CallRecords extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlerOnCallRecordQuery = this.handlerOnCallRecordQuery.bind(this);
        this.handleOnScrollEnd = this.handleOnScrollEnd.bind(this);
        this.handleOnQueryChange = this.handleOnQueryChange.bind(this);
        this.onCallRecordsChange = this.onCallRecordsChange.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        EventEmitter.once('onCallRecordsChangeEnvent', this.onCallRecordsChange);
        this.handlerOnCallRecordQuery();
    }
    onCallRecordsChange(phone) {
        const {query} = this.props;
        query.phone = phone;
        query.currentpage = 1;
        this.handlerOnCallRecordQuery();
    }
    handleOnQueryChange(name, value) {
        const {dispatch, query} = this.props;
        query.currentpage = 1;
        query[name] = value;
        dispatch(handlerOnCallRecordsChange(name, value));
        clearTimeout(clearFun);
        clearFun = setTimeout(function() { this.handlerOnCallRecordQuery(); }.bind(this) , 500);
    }
    handlerOnCallRecordQuery() {
        const {dispatch, query} = this.props;
        dispatch(handlerOnCallRecordQuery(query));
    }
    handleOnScrollEnd() {
        this.handlerOnCallRecordQuery();
    }
    render() {
        const {itemData, query, item, callType, callTimeOptionList} = this.props;
        return (<div>
                    <InboundRecordQuery callTimeOptionList = { callTimeOptionList }
                                      typeList = { callType}
                                      query={ query }
                                      handleOnChange={ this.handleOnQueryChange }  typeName = '呼叫类型'/>
                    <Row {...this.props}>
                        <Col
                             xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }>
                            <CrmScrollTable item = { item } onScrollEnd = { this.handleOnScrollEnd }  EEName = "CallRecords" itemData={ itemData } />
                        </Col>
                     </Row>
                </div>);
    }
}
function mapStateToProps(state) {
    const {CallRecords: {itemData, query, item}, Option: { callType, callTimeOptionList}} = state;
    return {
        itemData,
        query,
        item,
        callTimeOptionList,
        callType
    };
}

export default connect(mapStateToProps)(CallRecords);
