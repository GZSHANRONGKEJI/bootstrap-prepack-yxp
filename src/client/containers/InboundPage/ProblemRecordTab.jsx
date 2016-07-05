import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Tab } from 'react-bootstrap';
import ProblemRecord from '../../components/InboundPage/ProblemRecord.jsx';
import ProblemRecordList from '../../components/InboundPage/ProblemRecordList.jsx';
import Prompt from '../../components/semanticui/Prompt.jsx';
import EventEmitter from '../../common/eventemitter';
import { handlerOnRecordEditItem, handlerOnRecordDeleteItem, handlerOnRecordSubmit, handlerOnRecordSave, handlerOnRecordChange, handlerOnRecordNew, handlerOnRecordLoad, handleOnRecordOppRefresh } from '../../actions/index.js';
import common from '../../common/common.js';
import { request } from '../../api/serverApi.js';
class ProblemRecordTab extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlerOnEditItem = this.handlerOnEditItem.bind(this);
        this.handlerOnDeleteItem = this.handlerOnDeleteItem.bind(this);
        this.handlerOnRecordSubmit = this.handlerOnRecordSubmit.bind(this);
        this.handlerOnRecordSave = this.handlerOnRecordSave.bind(this);
        this.handlerOnRecordChange = this.handlerOnRecordChange.bind(this);
        this.handlerOnRecordNew = this.handlerOnRecordNew.bind(this);
        this.handleOnLoad = this.handleOnLoad.bind(this);
        this.handleOnOppRefresh =this.handleOnOppRefresh.bind(this);
        this.LargeArea = [];
        this.questionCategory = [];
    }
    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
    }
    componentWillUpdate(nextProps, nextState) {
        const {dispatch} = this.props;
    }
    componentDidMount() {
        const {dispatch, item, RecordEmpty} = this.props;
        item.usephone = common.getTemp().phone;
        RecordEmpty.usephone = common.getTemp().phone;
        //this.handleOnLoad();
        EventEmitter.on('onOppRefreshEnvent', this.handleOnOppRefresh);
        EventEmitter.on('onEditProblemRecord', this.handlerOnEditItem);
    }
    handleOnLoad() {
        const {dispatch} = this.props;
        dispatch(handlerOnRecordLoad());


    } 
    handlerOnEditItem(item) {
        const {dispatch, item: Record } = this.props;
        
        if(item.type && item.type == 1) {
            common.emit('onActiveKey', '问题记录');
        }
        else if(Record.State == 0 ) {
            if(!confirm("继续操作会丢失你未保存的数据，是否继续")) {
                return;
            }
            
           // $(ReactDOM.findDOMNode(this.refs.EditPrompt)).modal('show');
        }
        dispatch(handlerOnRecordEditItem(item));
    }
    handlerOnDeleteItem(item) {
        const {dispatch} = this.props;

        if(item.State != 2 ) {
            if(confirm('是否删除')) {
                dispatch(handlerOnRecordDeleteItem(item));
            }
        }
        else {
            alert('已提交无法删除');

        }
    }
    handlerOnRecordSubmit(item) {
        const {dispatch} = this.props;
        dispatch(handlerOnRecordSubmit(item));
    }
    handleOnOppRefresh(DataList) {
        const {dispatch} = this.props;
        dispatch(handleOnRecordOppRefresh(DataList));
    }
    handlerOnRecordSave(item) {
        const {dispatch, item:Record} = this.props;
        dispatch(handlerOnRecordSave(item, Record));
    }
    handlerOnRecordChange(name, value) {
        const {dispatch} = this.props;
        dispatch(handlerOnRecordChange(name, value));
    }
    handlerOnRecordNew() {
        const {dispatch, RecordEmpty} = this.props;
        dispatch(handlerOnRecordNew(RecordEmpty));
    }
    render() {
        const {ProblemList, item, clientclass, processingmode, OppList} = this.props;
        var LargeArea = this.LargeArea;
        var questionCategory = this.questionCategory;
        if(LargeArea.length === 0 ) {
            request.post('AccMgr/OpportunityService.svc/GetBusinessUnit','', !1).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                     const { req : { businessunitlist } } = JSON.parse(message);
                     LargeArea = businessunitlist;
                } 
            });
            this.LargeArea = LargeArea;
        }
        if(questionCategory.length === 0 ) {
            request.post('AccMgr/OpportunityService.svc/questionCategory','', !1).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                     const { req : { QuestionList } } = JSON.parse(message);
                     questionCategory = QuestionList;
                } 
            });
            this.questionCategory = questionCategory;
        }
        return (<div>
                    <ProblemRecordList
                                       striped={ true }
                                       bordered={ false }
                                       condensed={ false }
                                       hover={ true }
                                       ProblemList={ ProblemList }
                                       onSubmitItem = { this.handlerOnRecordSubmit } 
                                       onEditItem={ this.handlerOnEditItem }
                                       onDeleteItem={ this.handlerOnDeleteItem } />
                    <ProblemRecord
                                   className="form-horizontal ui form"
                                   handleOnSubmit={ this.handlerOnRecordSubmit }
                                   handleOnSave={ this.handlerOnRecordSave }
                                   item={ item }
                                   clientclass={ clientclass }
                                   processingmode={ processingmode }
                                   LargeArea = { LargeArea }
                                   questionCategory = { questionCategory }
                                   handlerOnRecordChange = { this.handlerOnRecordChange }
                                   handlerOnRecordNew = { this.handlerOnRecordNew }
                                   membersList = { OppList } />
                    <Prompt  ref= 'EditPrompt'/>
                </div>
            );
    }
}
function mapStateToProps(state) {
    let  {ProblemRecord : {list:ProblemList, Record:item,RecordEmpty, LargeArea, OppList}, Option: {clientclass, processingmode}} = state;

    return {
        ProblemList,
        item,
        clientclass,
        processingmode,
        RecordEmpty,
        
        LargeArea,
        OppList
    };
}

export default connect(mapStateToProps)(ProblemRecordTab);
