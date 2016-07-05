import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row,Col,Button,Tab } from 'react-bootstrap';
import CrmPanelGroup from '../../components/CrmWeb/CrmPanelGroup.jsx';
import CrmLabel from '../../components/CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../../components/CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../../components/CrmWeb/CrmInputDiv.jsx';
import Textarea from '../../components/CustomHtml/Textarea.jsx';
import Sdropdown from '../../components/semanticui/Sdropdown.jsx';

class InboundProblemFeedbackTab extends Component {

    constructor(props, content) {
        super(props, content);}
    componentWillReceiveProps(nextProps){
    const { dispatch } = this.props;
}
componentWillUpdate(nextProps,nextState){
    const { dispatch } = this.props;
}
componentDidMount(){
    const { dispatch } = this.props;
}

    render() {
        const {item} = this.props;
let item.name = 'undefined';
return (<Tab {...this.props}  title="问题记录"  eventKey={1}  key={1}  >
    <CrmPanelGroup header="问题记录"  >
    <Row >
    <Col xs={12}  md={12}  sm={12}  lg={12} >
    <CrmInputForm>
    <CrmLabel label="选择问题类别"  labelClassName="col-xs-2"  />
<CrmInputDiv className="col-xs-4" >
    <Sdropdown />

</CrmInputDiv>
<CrmLabel label="问题处理方式"  labelClassName="col-xs-2"  />
<CrmInputDiv className="col-xs-4" >
    <Sdropdown />

</CrmInputDiv>

</CrmInputForm>

</Col>

</Row>
<Row >
    <Col xs={12}  md={12}  sm={12}  lg={12} >
    <CrmInputForm>
    <CrmLabel label="问题描述"  labelClassName="col-xs-2"  />
<CrmInputDiv className="col-xs-10" >
    <Textarea />

</CrmInputDiv>

</CrmInputForm>

</Col>

</Row>
<Row>
    <Col xs={12}  md={12}  sm={12}  lg={12} >
    <CrmInputForm>
    <CrmLabel label="问题反馈"  labelClassName="col-xs-2"  />
<CrmInputDiv className="col-xs-10" >
    <Textarea />

</CrmInputDiv>

</CrmInputForm>

</Col>

</Row>

</CrmPanelGroup>
<CrmPanelGroup header="问题反馈" >
    <Row >
    <Col xs={12}  md={12}  sm={12}  lg={12} >
    <CrmInputForm>
    <CrmLabel label="问题解决状态"  labelClassName="col-xs-2"  />
<CrmInputDiv className="col-xs-4" >
    <Sdropdown />

</CrmInputDiv>

</CrmInputForm>

</Col>

</Row>
<Row >
    <Col xs={12}  md={12}  sm={12}  lg={12} >
    <CrmInputForm>
    <CrmLabel label="问题反馈"  labelClassName="col-xs-2"  />
<CrmInputDiv className="col-xs-10" >
    <Textarea value={item.name}  />

</CrmInputDiv>

</CrmInputForm>

</Col>

</Row>
<Row>
    <Col xs={3}  md={3}  sm={3}  lg={3}   />
<Col xs={2}  md={2}  sm={2}  lg={2} >
    <Button bsStyle="primary" >
    <span>
    保存
</span>

</Button>

</Col>

</Row>

</CrmPanelGroup>

</Tab>
);
}
}
function mapStateToProps(state) {
    const {item} = state;
    return {item};

}

export default connect(mapStateToProps)(InboundProblemFeedbackTab);
