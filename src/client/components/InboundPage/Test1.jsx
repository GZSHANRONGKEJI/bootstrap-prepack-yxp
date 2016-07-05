import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import CrmInput from '../CrmWeb/CrmInput.jsx';
import CrmLabel from '../CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../CrmWeb/CrmInputDiv.jsx';
import Sdropdown from '../semanticui/Sdropdown.jsx';

class Test1 extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        return (<Row
                     {...this.props}
                     className="fields">
                    <Col
                         xs={ 4 }
                         md={ 4 }
                         sm={ 4 }
                         lg={ 4 }>
                        <CrmInputForm
                                      hasFeedback={ false }
                                      required={ false }
                                      style={ {    "marginBottom": 3} }>
                            <CrmLabel label="业务类型" />
                            <CrmInputDiv>
                                <Sdropdown defaultValue={ 2 } />
                            </CrmInputDiv>
                        </CrmInputForm>
                    </Col>
                    <Col
                         xs={ 4 }
                         md={ 4 }
                         sm={ 4 }
                         lg={ 4 }>
                        <CrmInputForm
                                      hasFeedback={ false }
                                      style={ {    "marginBottom": 0} }>
                            <CrmLabel label="客户类型" />
                            <CrmInputDiv>
                                <Sdropdown />
                            </CrmInputDiv>
                        </CrmInputForm>
                    </Col>
                    <Col
                         xs={ 4 }
                         md={ 4 }
                         sm={ 4 }
                         lg={ 4 }>
                        <CrmInputForm
                                      hasFeedback={ false }
                                      style={ {    "marginBottom": 0} }>
                            <CrmLabel label="客户归属" />
                            <CrmInputDiv>
                                <CrmInput />
                            </CrmInputDiv>
                        </CrmInputForm>
                    </Col>
                </Row>
            );
    }
}

export default Test1;
