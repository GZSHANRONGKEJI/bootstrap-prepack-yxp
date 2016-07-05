
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { PanelGroup } from '../components/Bootstrap';
import { Table } from 'react-bootstrap';
import { Tabs } from '../components/Bootstrap';
import { Tab } from 'react-bootstrap';
import CrmPanelGroup from '../components/CrmWeb/CrmPanelGroup.jsx';
import CrmInput from '../components/CrmWeb/CrmInput.jsx';
import CrmLabel from '../components/CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../components/CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../components/CrmWeb/CrmInputDiv.jsx';
import Sdropdown from '../components/semanticui/Sdropdown.jsx';


class InboundData extends Component {

    render() {
        return (
            <div>
                <Grid fluid={ true }
                      style={ {    marginTop: '10px',    marginLeft: '20px',    marginRight: '20px'} }
                      params={ this.props.params }>
                    <Row params={ this.props.params }>
                        <Col xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }
                             params={ this.props.params }>
                            <Grid fluid={ true }
                                  style={ {    marginBottom: '-10px'} }
                                  params={ this.props.params }>
                                <form className="form-horizontal ui form" params={ this.props.params }>
                                    <Row params={ this.props.params }>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false } params={ this.props.params }>
                                                <CrmLabel label="来电号码" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <CrmInput params={ this.props.params }></CrmInput>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false } params={ this.props.params }>
                                                <CrmLabel label="来电时间" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <CrmInput params={ this.props.params }></CrmInput>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false } params={ this.props.params }>
                                                <CrmLabel label="归属地" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <CrmInput params={ this.props.params }></CrmInput>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                    </Row>
                                </form>
                                <PanelGroup accordion={ true }
                                            defaultActiveKey={ 1 }
                                            params={ this.props.params }></PanelGroup>
                            </Grid>
                        </Col>
                    </Row>
                    <Row params={ this.props.params }>
                        <Col xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }
                             params={ this.props.params }>
                            <Grid fluid={ true } params={ this.props.params }>
                                <CrmPanelGroup header="客户信息" params={ this.props.params }>
                                    <Row className="fields" params={ this.props.params }>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false }
                                                          required={ false }
                                                          style={ {    marginBottom: 3} }
                                                          params={ this.props.params }>
                                                <CrmLabel label="业务类型" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <Sdropdown defaultValue={ 2 } params={ this.props.params }></Sdropdown>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false }
                                                          style={ {    marginBottom: 0} }
                                                          params={ this.props.params }>
                                                <CrmLabel label="客户类型" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <Sdropdown params={ this.props.params }></Sdropdown>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false }
                                                          style={ {    marginBottom: 0} }
                                                          params={ this.props.params }>
                                                <CrmLabel label="客户归属" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <CrmInput params={ this.props.params }></CrmInput>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                    </Row>
                                    <Row className="fields" params={ this.props.params }>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false } params={ this.props.params }>
                                                <CrmLabel label="姓名" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <CrmInput params={ this.props.params }></CrmInput>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false } params={ this.props.params }>
                                                <CrmLabel label="证件号" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <CrmInput params={ this.props.params }></CrmInput>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false } params={ this.props.params }>
                                                <CrmLabel label="性别" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <Sdropdown params={ this.props.params }></Sdropdown>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                    </Row>
                                    <Row className="fields " params={ this.props.params }>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false } params={ this.props.params }>
                                                <CrmLabel label="手机" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <CrmInput params={ this.props.params }></CrmInput>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false } params={ this.props.params }>
                                                <CrmLabel label="电话" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <CrmInput params={ this.props.params }></CrmInput>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                        <Col xs={ 4 }
                                             md={ 4 }
                                             sm={ 4 }
                                             lg={ 4 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false } params={ this.props.params }>
                                                <CrmLabel label="通讯地址" params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv params={ this.props.params }>
                                                    <CrmInput params={ this.props.params }></CrmInput>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                    </Row>
                                    <Row className="fields" params={ this.props.params }>
                                        <Col xs={ 12 }
                                             md={ 12 }
                                             sm={ 12 }
                                             lg={ 12 }
                                             params={ this.props.params }>
                                            <CrmInputForm hasFeedback={ false } params={ this.props.params }>
                                                <CrmLabel label="备注"
                                                          labelClassName="col-xs-1"
                                                          params={ this.props.params }></CrmLabel>
                                                <CrmInputDiv className="col-xs-11" params={ this.props.params }>
                                                    <CrmInput params={ this.props.params }></CrmInput>
                                                </CrmInputDiv>
                                            </CrmInputForm>
                                        </Col>
                                    </Row>
                                    <Row params={ this.props.params }>
                                        <Col xs={ 3 }
                                             md={ 3 }
                                             sm={ 3 }
                                             lg={ 3 }
                                             params={ this.props.params }></Col>
                                        <Col xs={ 6 }
                                             md={ 6 }
                                             sm={ 6 }
                                             lg={ 6 }
                                             params={ this.props.params }>
                                            <Row params={ this.props.params }>
                                                <Col xs={ 3 }
                                                     md={ 3 }
                                                     sm={ 3 }
                                                     lg={ 3 }
                                                     params={ this.props.params }>
                                                    <Button bsStyle="primary"
                                                            bsSize="sm"
                                                            params={ this.props.params }>
                                                        <span params={ this.props.params }>保存</span>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={ 3 }
                                             md={ 3 }
                                             sm={ 3 }
                                             lg={ 3 }
                                             params={ this.props.params }></Col>
                                    </Row>
                                </CrmPanelGroup>
                                <PanelGroup accordion={ true }
                                            defaultActiveKey={ 1 }
                                            params={ this.props.params }></PanelGroup>
                            </Grid>
                        </Col>
                    </Row>
                    <Row style={ {    marginBottom: '50px'} } params={ this.props.params }>
                        <Col xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }
                             params={ this.props.params }>
                            <Tabs defaultActiveKey={ 2 }
                                  style={ {    marginTop: '-10px'} }
                                  params={ this.props.params }>
                                <Aadd title="问题记录"
                                      eventKey={ 1 }
                                      key={ 1 }
                                      params={ this.props.params }></Aadd>
                                <Tab title="问题历史记录"
                                     eventKey={ 2 }
                                     key={ 2 }
                                     params={ this.props.params }>
                                    <Row params={ this.props.params }>
                                        <Col xs={ 12 }
                                             md={ 12 }
                                             sm={ 12 }
                                             lg={ 12 }
                                             params={ this.props.params }>
                                            <Table striped={ true }
                                                   bordered={ false }
                                                   condensed={ false }
                                                   hover={ true }
                                                   params={ this.props.params }>
                                                <thead params={ this.props.params }>
                                                    <tr params={ this.props.params }>
                                                        <th params={ this.props.params }>
                                                            <span params={ this.props.params }>我</span>
                                                        </th>
                                                        <th params={ this.props.params }>
                                                            <span params={ this.props.params }>Text in th</span>
                                                        </th>
                                                        <th params={ this.props.params }>
                                                            <span params={ this.props.params }>Text in th</span>
                                                        </th>
                                                        <th params={ this.props.params }>
                                                            <span params={ this.props.params }>Text in th</span>
                                                        </th>
                                                        <th params={ this.props.params }>
                                                            <span params={ this.props.params }>Text in th</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody params={ this.props.params }>
                                                    <tr params={ this.props.params }>
                                                        <td params={ this.props.params }>
                                                            <span params={ this.props.params }>Text in td</span>
                                                        </td>
                                                        <td params={ this.props.params }>
                                                            <span params={ this.props.params }>Text in td</span>
                                                        </td>
                                                        <td params={ this.props.params }>
                                                            <span params={ this.props.params }>Text in td</span>
                                                        </td>
                                                        <td params={ this.props.params }>
                                                            <span params={ this.props.params }>Text in td</span>
                                                        </td>
                                                        <td params={ this.props.params }>
                                                            <span params={ this.props.params }>Text in td</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab title="查询会员"
                                     eventKey={ 3 }
                                     key={ 3 }
                                     params={ this.props.params }>
                                    <Panel params={ this.props.params }>
                                        <p params={ this.props.params }>
                                            <span params={ this.props.params }>12312312312312</span>
                                        </p>
                                    </Panel>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Grid>
            </div>
            );
    }
}

export default InboundData;

