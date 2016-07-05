import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import CrmInput from '../CrmWeb/CrmInput.jsx';
import Sdropdown from '../semanticui/Sdropdown.jsx';
import CrmLabel from '../CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../CrmWeb/CrmInputDiv.jsx';

class InboundRecordQuery extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnChange(e) {
        const {handleOnChange} = this.props;
        var name = e.target.name;
        var value = e.target.value;
        handleOnChange(name, value);
    }

    render() {
        const {query, callTimeOptionList, typeList, typeName} = this.props;
        return  (  <form className="form-horizontal ui form" style= { { marginTop: "5px"} }>
                            <Row>
                                <Col
                                     xs={ 12 }
                                     md={ 12 }
                                     sm={ 12 }
                                     lg={ 12 }>
                                    <CrmInputForm
                                              hasFeedback={ false }
                                              required={ true }>
                                    <CrmLabel
                                              label="来电时间"
                                              labelClassName="col-xs-1" />
                                    <CrmInputDiv className="col-xs-2">
                                       <Sdropdown value={ query.callTimeOption}   clear = { true } name="callTimeOption" list= { callTimeOptionList }  onChange={ this.handleOnChange } />
                                    </CrmInputDiv>
                                    <CrmLabel
                                              label= { typeName }
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-2 ">
                                        <Sdropdown value={ query.type }  name="type" list= { typeList }  clear = { true } onChange={ this.handleOnChange } />
                                    </CrmInputDiv>
                                    <CrmLabel
                                              label= { '手机号码' }
                                              labelClassName="col-xs-1" />
                                    <CrmInputDiv className="col-xs-2 ">
                                        <CrmInput value={ query.usephone }  name="usephone"  onChange={ this.handleOnChange } />
                                    </CrmInputDiv>
                                </CrmInputForm>
                                </Col>
                            </Row>
                        </form>);
    }
}
InboundRecordQuery.defaultProps = {
    typeList: [],
    callTimeOptionList: [],
    typeName:"",
    query: PropTypes.shape({
        type: '',
        callTimeOption: '',
        usephone:''
    }),
};
InboundRecordQuery.propTypes = {
    typeList: PropTypes.array,
    callTimeOptionList: PropTypes.array,
    typeName: PropTypes.string,
    query: PropTypes.shape({
        type: PropTypes.string,
        callTimeOption: PropTypes.string
    }),
    handleOnChange: PropTypes.func
};

export default InboundRecordQuery;
