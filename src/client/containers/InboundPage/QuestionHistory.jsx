import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tab } from 'react-bootstrap';
import CrmScrollChildrenTable from '../../components/CrmWeb/CrmScrollChildrenTable.jsx';
import { handlerOnQuestionHistoryQeury, handlerOnQuestionHistoryAdditional, handlerOnQuestionHistoryOpen, handlerOnQuestionHistoryQueryChange   } from '../../actions/index.js';
import QuestionHistoryListRow from '../../components/InboundPage/QuestionHistoryListRow.jsx';
import QuestionHistoryListAdditionalRow from '../../components/InboundPage/QuestionHistoryListAdditionalRow.jsx';
import InboundRecordQuery from '../../components/InboundPage/InboundRecordQuery.jsx';
import EventEmitter from '../../common/eventemitter';
import common from '../../common/common.js';

var clearFun;
class QuestionHistory extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlerOnQeury = this.handlerOnQeury.bind(this);
        this.handleOnScrollEnd = this.handleOnScrollEnd.bind(this);
        this.onQuestionHistoryChange = this.onQuestionHistoryChange.bind(this);
        this.handleOnQueryChange = this.handleOnQueryChange.bind(this);
        this.handlerOnAdditional = this.handlerOnAdditional.bind(this);
        this.handleOnOpen = this.handleOnOpen.bind(this);
        this.handlerOnQeuryTopOne = this.handlerOnQeuryTopOne.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
    }
    componentWillUpdate(nextProps, nextState) {
        const {dispatch} = this.props;
    }
    componentDidMount() {
        const {dispatch} = this.props;
        EventEmitter.once('onQuestionHistoryChangeEnvent', this.onQuestionHistoryChange);
        EventEmitter.on('handlerOnQuestionHistoryTopOne', this.handlerOnQeuryTopOne);
        clearTimeout(clearFun);
        clearFun = setTimeout(function() { this.handlerOnQeury(); }.bind(this), 500);
    }
    onQuestionHistoryChange(phone) {
        const {query} = this.props;
        query.currentpage = 1;
        query.phone = phone;
        clearTimeout(clearFun);
        clearFun = setTimeout(function() { this.handlerOnQeury(); }.bind(this), 500);
    }
    handlerOnQeuryTopOne() {

        const {dispatch, query} = this.props;
        query.currentpage = 1;
        clearTimeout(clearFun);
        clearFun = setTimeout(function() { this.handlerOnQeury(); }.bind(this), 500);
    }
    handlerOnQeury() {

        const {dispatch, query} = this.props;

        dispatch(handlerOnQuestionHistoryQeury(query));
    }
    handleOnQueryChange(name, value) {
        const {dispatch, query} = this.props;
        query.currentpage = 1;
        query[name] = value;
        dispatch(handlerOnQuestionHistoryQueryChange(name, value));
        clearTimeout(clearFun);
        clearFun = setTimeout(function() { this.handlerOnQeury(); }.bind(this), 500);
        
    }
    handleOnScrollEnd() {
        this.handlerOnQeury();
    }
    handlerOnAdditional(item, problemdescription) {
        const {dispatch} = this.props;
        dispatch(handlerOnQuestionHistoryAdditional(item, problemdescription));
    }
    handleOnOpen(item) {
        const {dispatch} = this.props;
        dispatch(handlerOnQuestionHistoryOpen(item));
    }
    render() {
        const {itemData,query, CallRecords, item, callTimeOptionList, processingmode }= this.props;
        let list = [];
        let colSpan = item.head.length;
        // var itemData =  [{
        //     name: 'Text in td',
        //     phonenumber: 'Text in td',
        //     owneridName: 'Text in td',
        //     processingmodeOpt: 'Text in td',
        //     problemdescription: new Array(45).join('123123123'),
        //     feedback:new Array(45).join('123123123'),
        //     problemstate:'123',
        //     Processingmode:1,
        //     questionsolvestatus:1,
        //     open: true
        // }];
        if (itemData && itemData.length > 0) { 
                itemData.map((item1, index) => {
                    item1.open === undefined && (item1.open = !1); 
                    list.push(<QuestionHistoryListRow handleOnInfo = { common.info }  handleOnOpen = { this.handleOnOpen } item = { item1 } />);
                    list.push(<QuestionHistoryListAdditionalRow  tdlength = { colSpan } handlerOnAdditional = { this.handlerOnAdditional }  item = { item1 } />);
                })
        }
        else {
            list = (<tr><td colSpan={ colSpan || 1 }>empty</td></tr>);
        }


        return (<div>
                        <InboundRecordQuery callTimeOptionList = { callTimeOptionList }
                                      typeList = { processingmode}
                                      query={ query }
                                      handleOnChange={ this.handleOnQueryChange }  typeName = '问题解决类型'/>
                        <Row  {...this.props}>
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmScrollChildrenTable EEName ="EEQuestionHistory"  item = { item } onScrollEnd = { this.handleOnScrollEnd } itemData = { itemData }>
                                    { list }
                                 </CrmScrollChildrenTable>
                            </Col>
                        </Row>
                    </div>);
    }
}
function mapStateToProps(state) {
    const {QuestionHistory: {itemData, query , item }, Option: { processingmode, callTimeOptionList}} = state;
    return {
        itemData,
        query,
        item,
        processingmode,
        callTimeOptionList
    };
}

export default connect(mapStateToProps)(QuestionHistory);
