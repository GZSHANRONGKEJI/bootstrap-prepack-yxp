import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tab } from 'react-bootstrap';
import { Tabs } from '../../components/Bootstrap';
import ProblemRecordTab from './ProblemRecordTab.jsx';
import CustomerVip from './CustomerVip.jsx';
import QuestionHistory from './QuestionHistory.jsx';
import VisitPlanTab from './VisitPlanTab.jsx';
import CallRecords from './CallRecords.jsx';
import InboundProblemFeedbackTab from './InboundProblemFeedbackTab.jsx';
import SalesFollowTaskTab from './SalesFollowTaskTab.jsx';
import MembersInfoChangeTab from './MembersInfoChangeTab.jsx';
import { handlerOnTabsSelect } from '../../actions/index.js';
import EventEmitter from '../../common/eventemitter';
import common from '../../common/common.js';
class InboundTabs extends Component {

    constructor(props, content) {
        super(props, content);
        this.state = {
            CallRecords:2,
            QuestionHistory:3,
            CustomerVip:4,
            key:1,
            ProblemFeedbackState:0
        }
        this.handlerOnTabsSelect = this.handlerOnTabsSelect.bind(this);
        this.handlerOnProblemFeedback = this.handlerOnProblemFeedback.bind(this);
        this.onActiveKey = this.onActiveKey.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
    }
    componentWillUpdate(nextProps, nextState) {
        const {dispatch} = this.props;
    }
    componentDidMount() {
        const {dispatch} = this.props;
       EventEmitter.once('InboundTabsToProblemFeedbackEvent', this.handlerOnProblemFeedback);
       EventEmitter.on('onActiveKey', this.onActiveKey)
    }
    onActiveKey(keyName){
        var index = 1;
        // var dx = common.getTemp().UserRolesName.indexOf('电销专员');
        // if(dx > -1) {
        //     index++;
        // }
         if(common.getTemp().entityName === 'phonecall') {
                index++;
         }
        if(keyName == '问题记录') {
            this.setState({key: index});
        }
    }
    handlerOnTabsSelect(tag) {
        var tag2 = 2;
        var tag3 = 3;
        //var dx = common.getTemp().UserRolesName.indexOf('电销专员');
        if(common.getTemp().entityName === 'phonecall') {
            tag2++;
            tag3++;
        }
     
        if(common.getTemp().entityName === 'phonecall' && common.getTemp().formtype != 2 )
        {
            tag2 = 1;
            tag3 = 2;

        }
        if(typeof tag  === "number") {
            let  state = {};
            if(tag === tag2 && this.state.QuestionHistory > 0) {
                EventEmitter.emit('EEQuestionHistory');
                state = { QuestionHistory:0 }
            }
            else if(tag === tag3 && this.state.CallRecords > 0) { 
                EventEmitter.emit('CallRecords')
                state = { CallRecords:0 }
            }
        
            state = Object.assign(state, { key: tag });
            this.setState(state);
        }

    }
    handlerOnProblemFeedback(id) {
      if(this.state.ProblemFeedbackState === 0 ) {
        common.emit('InboundProblemFeedbackLoadEvent', id);
        this.setState( { ProblemFeedbackState : 1});
      }
    }
    render() {
        var ProblemFeedbackState = this.state.ProblemFeedbackState === 0;
        var ProblemFeedbackDom = [];
        if(!ProblemFeedbackState) {
                   ProblemFeedbackDom = (<Tab eventKey={ 5 }
                         key={ 5 } title="问题反馈验证">
                        <InboundProblemFeedbackTab />
                    </Tab>);
        }
        var s6 = [];
         var s7 = [];
        //var dx = common.getTemp().UserRolesName.indexOf('电销专员');
        if(common.getTemp().entityName === 'phonecall') {
              s6 = (<Tab
                         title="会员跟进"
                         eventKey={ 6 }
                         key={ 6 }>
                        <Row>
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <SalesFollowTaskTab />
                            </Col>
                        </Row>
                </Tab>)
            s7.push(<Tab
                         title="会员变更"
                         eventKey={ 7 }
                         key={ 7 }>
                        <MembersInfoChangeTab />
                    </Tab>);
        }
       
  
        const tabs = (<Tabs
                      {...this.props}
                      activeKey={ this.state.key }
                      onSelect = { this.handlerOnTabsSelect }
                      style={ { "marginTop": "10px"} }>
                    { s6 }
                    <Tab
                         title="问题记录"
                         eventKey={ 1 }
                         key={ 1 }>
                        <Row>
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <ProblemRecordTab />
                            </Col>
                        </Row>
                    </Tab>

                    <Tab
                         title="历史问题记录"
                         eventKey={ 2 }
                         key={ 2 }>
                        <QuestionHistory />
                    </Tab>
                    <Tab
                         title="通话记录查询"
                         eventKey={ 3 }
                         key={ 3 }>
                        <CallRecords />
                    </Tab>
                    <Tab
                         title="回访计划"
                         eventKey={ 4 }
                         key={ 4 }>
                        <VisitPlanTab />
                    </Tab>
                    { ProblemFeedbackDom 
                    }
                   { s7 }
                </Tabs>
            );
        const tabs1 = (<Tabs
                      {...this.props}
                      activeKey={ this.state.key }
                      onSelect = { this.handlerOnTabsSelect }
                      style={ { "marginTop": "10px"} }>
    
                    <Tab
                         title="历史问题记录"
                         eventKey={ 2 }
                         key={ 2 }>
                        <QuestionHistory />
                    </Tab>
                    <Tab
                         title="通话记录查询"
                         eventKey={ 3 }
                         key={ 3 }>
                        <CallRecords />
                    </Tab>
                </Tabs>
            );
        const tabs2 = (<Tabs
                      {...this.props}
                      activeKey={ this.state.key }
                      onSelect = { this.handlerOnTabsSelect }
                      style={ { "marginTop": "10px"} }>
                    { s6 }</Tabs>);
        if(common.getTemp().entityName === 'phonecall' && common.getTemp().usertype === '1') {
            return tabs2;
        }
        if(common.getTemp().entityName === 'phonecall' && common.getTemp().formtype != 2 )
        {
            return tabs1;
        }
        else {
            return tabs;
        }

    }
}
export default connect()(InboundTabs);
