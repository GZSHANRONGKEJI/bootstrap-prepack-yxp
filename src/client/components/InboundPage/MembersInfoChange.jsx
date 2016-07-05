import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, Grid } from 'react-bootstrap';
import CrmPanelGroup from '../CrmWeb/CrmPanelGroup.jsx';
import CrmInput from '../CrmWeb/CrmInput.jsx';
import CrmLabel from '../CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../CrmWeb/CrmInputDiv.jsx';
import Textarea from '../CustomHtml/Textarea.jsx';
import LoadingButton from '../CrmWeb/LoadingButton.jsx';
import Sdropdown from '../semanticui/Sdropdown.jsx';

class MembersInfoChange extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handlerOnSubmit = this.handlerOnSubmit.bind(this);
    }
    handleOnSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const {handlerOnSave, item} = this.props;
        if (handlerOnSave) {
            handlerOnSave(item);
        }
    }
    handleOnChange(e) {
        e.preventDefault();
        e.stopPropagation();
        const {handlerOnChange} = this.props;
        if (handlerOnChange) {
            handlerOnChange(e.target.name, e.target.value);
        }
    }
    handlerOnSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const {handlerOnSubmit, item} = this.props;
        if (handlerOnSubmit) {
            handlerOnSubmit(item);
        }
    }
    InitFroms(field, item, customertype, businesstype, LargeArea,province,city, sellertype,followresultList,completionstate) {
        var FromList = [];
        var From = [];
        var  index = 1;
        for (var i = 0; i < field.length ; i++, index++) {
            var crmfield = field[i];
            var text = crmfield.text;
            var value = crmfield.value;
            var className =crmfield.className || 'col-xs-2';
            From.push(<CrmLabel label= { text } labelClassName="col-xs-1 nopaddingleft nopaddingright" />);
            if(crmfield.type == "dropdown") {
                 if(crmfield.disabled == true) {
                    From.push(<CrmInputDiv className={ className }>
                                         <CrmInput value={ item[value] } name = { value }  disabled = 'disabled'  />
                                    </CrmInputDiv>); 
                }
                else {
                    if(crmfield.list == "LargeArea") {
                        From.push(<CrmInputDiv className={ className }>
                                        <Sdropdown value={ item[value] } name= { value } list = { LargeArea } onChange={ this.handleOnChange }/>
                                    </CrmInputDiv>); 
                    }
                    else if(crmfield.list == "customertype") {
                        From.push(<CrmInputDiv className={ className }>
                                        <Sdropdown value={ item[value] } name= { value } list = { customertype } onChange={ this.handleOnChange }/>
                                    </CrmInputDiv>); 
                    }
                    else if(crmfield.list == "businesstype") {
                        From.push(<CrmInputDiv className={ className }>
                                        <Sdropdown value={ item[value] } name= { value } list = { businesstype } onChange={ this.handleOnChange }/>
                                    </CrmInputDiv>); 
                    }
                    else if(crmfield.list == "province") {
                        From.push(<CrmInputDiv className={ className }>
                                        <Sdropdown value={ item[value] } name= { value } list = { province } onChange={ this.handleOnChange }/>
                                    </CrmInputDiv>); 
                    }
                    else if(crmfield.list == "city") {
                        From.push(<CrmInputDiv className={ className }>
                                        <Sdropdown value={ item[value] } name= { value } list = { city } onChange={ this.handleOnChange }/>
                                    </CrmInputDiv>); 
                    }
                    else if(crmfield.list == "sellertype") {
                        From.push(<CrmInputDiv className={ className }>
                                        <Sdropdown value={ item[value] } name= { value } list = { sellertype } onChange={ this.handleOnChange }/>
                                    </CrmInputDiv>); 
                    }
                    else if(crmfield.list == "followresultList") {
                        From.push(<CrmInputDiv className={ className }>
                                        <Sdropdown value={ item[value] } name= { value } list = { followresultList } onChange={ this.handleOnChange }/>
                                    </CrmInputDiv>); 
                    }
                    else if(crmfield.list == "completionstate") {
                        From.push(<CrmInputDiv className={ className }>
                                        <Sdropdown value={ item[value] } name= { value } list = { completionstate } onChange={ this.handleOnChange }/>
                                    </CrmInputDiv>); 
                    }
                }

            }
            else {
                if(crmfield.disabled == true) {
                    From.push(<CrmInputDiv className={ className }>
                                        <CrmInput value={ item[value] } name = { value }  disabled = 'disabled'  />
                                    </CrmInputDiv>); 
                }
                else {
                    From.push(<CrmInputDiv className={ className }>
                                        <CrmInput value={ item[value] } name = { value }  onChange={ this.handleOnChange } />
                                    </CrmInputDiv>); 
                }
            }

            if(index % 4 == 0 || crmfield.end == true) {
                index = 0;
                FromList.push(<Row className = "col-xs-12 fields">
                        <Col
                             xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }>
                            <CrmInputForm hasFeedback={ false }>
                              { From.concat([]) }
                            </CrmInputForm>
                        </Col>
                    </Row>);
                From = [];
            }
        };
        return FromList;
    }
    render() {
        const { item, followresultList, field, customertype, businesstype, LargeArea, province, city, sellertype, completionstate } = this.props;
        var customertype1 = [];
        if(item.xin_businesstype === "0") {
           customertype1 = _.reject(customertype, function(type){ return type.value  ==  2});
        }
        else if(item.xin_businesstype === "1"){
            customertype1 = _.reject(customertype, function(type){ return type.value  == 0});
        }
          var Froms = this.InitFroms(field, item, customertype1, businesstype, LargeArea, province, city, sellertype, followresultList, completionstate);
       var submitButton = [];
       if(item.state != 2 && item.xin_OppId) {
        submitButton.push(  <Col
                             xs={ 1 }
                             md={ 1 }
                             sm={ 1 }
                             lg={ 1 }>
                            <LoadingButton
                                    bsStyle="primary"
                                    onClick={ this.handleOnSave }>
                                <span>保存</span>
                            </LoadingButton>
                        </Col>);
           submitButton.push( <Col
                             xs={ 2 }
                             md={ 2 }
                             sm={ 2 }
                             lg={ 2 }>
                            <LoadingButton
                                    bsStyle="primary"
                                    onClick={ this.handlerOnSubmit }>
                                <span>提交</span>
                            </LoadingButton>
                        </Col>)
       }
        //var Froms = [];
        return (<form
                      {...this.props}
                      className="form-horizontal ui form">
                    <Grid
                          fluid={ true }
                          style={ {  "marginTop": "10px"} }> 
                    { Froms }

                    <Row>
                        <Col
                             xs={ 3 }
                             md={ 3 }
                             sm={ 3 }
                             lg={ 3 } />
                      
                         {submitButton}
                    </Row>
                </Grid>
            </form>
            );
    }
}
MembersInfoChange.propTypes = {
    handlerOnSave: PropTypes.func,
    handlerOnChange: PropTypes.func,
    handlerOnSubmit: PropTypes.func,
    followresultList: PropTypes.array,
    item: PropTypes.object,
    field: PropTypes.array,
    sellertype: PropTypes.array
};

export default MembersInfoChange;
