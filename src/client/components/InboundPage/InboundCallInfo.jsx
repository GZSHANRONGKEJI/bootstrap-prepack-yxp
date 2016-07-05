import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import CrmInput from '../CrmWeb/CrmInput.jsx';
import CrmLabel from '../CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../CrmWeb/CrmInputDiv.jsx';

class InboundCallInfo extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlerCallPhone =  this.handlerCallPhone.bind(this);
    }
    handlerCallPhone(e) {
        e.preventDefault();
        e.stopPropagation();
        const {handlerCallPhone, item} = this.props;
        if (handlerCallPhone) {
            handlerCallPhone(item.phonenumber);
        }
    }
    render() {
        const { item, CallColor } = this.props;
        return (<form
                      {...this.props}
                      className="form-horizontal ui form">
                    <Row>
                        <Col
                             xs={ 4 }
                             md={ 4 }
                             sm={ 4 }
                             lg={ 4 }>
                            <CrmInputForm hasFeedback={ false }>
                                <CrmLabel label="来电号码">
                                <i className="umyproto-icon-phone umyproto-article-lead" onClick = { this.handlerCallPhone } style= { { color : CallColor }}></i></CrmLabel>
                                <CrmInputDiv>
                                    <CrmInput  value = { item.phonenumber }  readOnly/>
                                </CrmInputDiv>
                            </CrmInputForm>
                        </Col>
                        <Col
                             xs={ 4 }
                             md={ 4 }
                             sm={ 4 }
                             lg={ 4 }>
                            <CrmInputForm hasFeedback={ false }>
                                <CrmLabel label="来电时间" />
                                <CrmInputDiv>
                                    <CrmInput  value = { item.time } readOnly/>
                                </CrmInputDiv>
                            </CrmInputForm>
                        </Col>
                        <Col
                             xs={ 4 }
                             md={ 4 }
                             sm={ 4 }
                             lg={ 4 }>
                            <CrmInputForm hasFeedback={ false }>
                                <CrmLabel label="归属地" />
                                <CrmInputDiv>
                                    <CrmInput value = { item.belonging } readOnly/>
                                </CrmInputDiv>
                            </CrmInputForm>
                        </Col>
                    </Row>
                </form>
            );
    }
}
InboundCallInfo.defaultProps = {
    item: {
        phonenumber: '',
        time: '',
        belonging: ''
    },
    CallColor:"#0FF116"
};
InboundCallInfo.propTypes = {
    item: PropTypes.shape({
        phonenumber: PropTypes.string,
        time: PropTypes.string,
        belonging: PropTypes.string
    }),
    handlerCallPhone:PropTypes.func,
    CallColor:PropTypes.string
};
export default InboundCallInfo;
