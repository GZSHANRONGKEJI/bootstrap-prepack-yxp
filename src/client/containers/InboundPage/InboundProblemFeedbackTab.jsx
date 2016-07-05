import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Tab } from 'react-bootstrap';
import CrmPanelGroup from '../../components/CrmWeb/CrmPanelGroup.jsx';
import CrmLabel from '../../components/CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../../components/CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../../components/CrmWeb/CrmInputDiv.jsx';
import CrmInput from '../../components/CrmWeb/CrmInput.jsx';
import Textarea from '../../components/CustomHtml/Textarea.jsx';
import Sdropdown from '../../components/semanticui/Sdropdown.jsx';
import SdropdownMultistag from '../../components/semanticui/SdropdownMultistag.jsx';
import { handlersOnProblemFeedbackSave, handlersOnProblemFeedbackChange, handlersOnProblemFeedbackLoad } from '../../actions/index.js';
import EventEmitter from '../../common/eventemitter';
import LoadingButton from '../../components/CrmWeb/LoadingButton.jsx';

class InboundProblemFeedbackTab extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlersOnSave = this.handlersOnSave.bind(this);
        this.handlersOnLoad = this.handlersOnLoad.bind(this);
        this.handlersOnChange = this.handlersOnChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
    }
    componentWillUpdate(nextProps, nextState) {
        const {dispatch} = this.props;
    }
    componentDidMount() {
        EventEmitter.once("InboundProblemFeedbackLoadEvent", this.handlersOnLoad);

    }
    handlersOnSave() {
        const {dispatch, item} = this.props;
        dispatch(handlersOnProblemFeedbackSave(item));
    }
    handlersOnChange(e) {
        const {dispatch} = this.props;
        dispatch(handlersOnProblemFeedbackChange(e.target.name, e.target.value));
    }
    handlersOnLoad(id) {
        const {dispatch} = this.props;
        dispatch(handlersOnProblemFeedbackLoad(id)); 
    } 
    render() {
        const {item, questionCategory, processingmode, resolutionstate } = this.props;
        return (<div>
                      <CrmPanelGroup header="问题反馈" defaultActiveKey= { 1 }>
                        <Row>
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmInputForm required= { true }>
                                    <CrmLabel
                                              label="问题解决状态"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-4">
                                        <Sdropdown list= { resolutionstate } name = "solvingstate" onChange = { this.handlersOnChange }  value = { item.solvingstate } />
                                    </CrmInputDiv>
                                </CrmInputForm>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmInputForm required= { true }>
                                    <CrmLabel
                                              label="问题反馈"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-10">
                                        <Textarea value = { item.Feedback1 }  name="Feedback1" onChange = { this.handlersOnChange }/>
                                    </CrmInputDiv>
                                </CrmInputForm>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                 xs={ 3 }
                                 md={ 3 }
                                 sm={ 3 }
                                 lg={ 3 } />
                            <Col
                                 xs={ 2 }
                                 md={ 2 }
                                 sm={ 2 }
                                 lg={ 2 }>
                                <LoadingButton bsStyle="primary" onClick = { this.handlersOnSave } >
                                    <span>保存</span>
                                </LoadingButton>
                            </Col>
                        </Row>
                    </CrmPanelGroup>
                    <CrmPanelGroup header="问题记录">
                        <Row>
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmInputForm >
                                    <CrmLabel
                                              label="选择问题类别"
                                              labelClassName="col-xs-2"   />
                                    <CrmInputDiv className="col-xs-4">

                                        <CrmInput value={ item.QuestionType2Name } disabled = 'disabled' className = { 'disabled ' }  />
                                    </CrmInputDiv>
                                    <CrmLabel
                                              label="问题处理方式"
                                              labelClassName="col-xs-2"   />
                                    <CrmInputDiv className="col-xs-4">
                                        <CrmInput value={ item.processingmodeOpt }  disabled = 'disabled' className = { 'disabled ' }  />
                                    </CrmInputDiv>
                                </CrmInputForm>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmInputForm>
                                    <CrmLabel
                                              label="问题描述"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-10">
                                        <Textarea  disabled = 'disabled'  value = { item.problemdescription }/>
                                    </CrmInputDiv>
                                </CrmInputForm>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmInputForm>
                                    <CrmLabel
                                              label="问题反馈"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-10">
                                        <Textarea   value = { item.feedback }  disabled = 'disabled'/>
                                    </CrmInputDiv>
                                </CrmInputForm>
                            </Col>
                        </Row>
                    </CrmPanelGroup>
                 
                </div>
            );
    }
}
function mapStateToProps(state) {
    const { inboundProblemFeedback: { item }, Option: {questionCategory, processingmode, resolutionstate} }= state;
    return {
        item,
        questionCategory,
        processingmode,
        resolutionstate
    };
}

export default connect(mapStateToProps)(InboundProblemFeedbackTab);
