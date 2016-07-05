import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Grid } from 'react-bootstrap';
import CrmPanelGroup from '../CrmWeb/CrmPanelGroup.jsx';
import CrmInput from '../CrmWeb/CrmInput.jsx';
import CrmLabel from '../CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../CrmWeb/CrmInputDiv.jsx';
import Textarea from '../CustomHtml/Textarea.jsx';
import LoadingButton from '../CrmWeb/LoadingButton.jsx';
import Sdropdown from '../semanticui/Sdropdown.jsx';
import common from '../../common/common.js';
class SalesFollowTask extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    OnIsValid() {
       const { item:item } = this.props;
         
        var customer =  {"name":"姓名",  "customertype":"客户类型", "businesstype":"业务类型" }
         
        
        if(item.cuestage == "3"){
            customer={"name":"姓名"};
           
        }
        if(!item.isconversion === false) {
            customer = {};
        }
        Object.assign(customer, {"theme":"主题", "content":"任务内容" ,"followresult":"跟进结果"});
        var isValid = true;
        for(var i in customer) {
          var ppValue = item[i];
          if(ppValue == "" || ppValue == null){
           common.alert(customer[i] + "不允许为空");
            isValid = false;
            return;
          }

        }
        return isValid;
      
    }

    handleOnSave(e) {
        e.preventDefault();
        e.stopPropagation();
        if(!this.OnIsValid()) {
            return;
        }
        const {handleOnSave} = this.props;
        if (handleOnSave) {
            handleOnSave();
        }
    }
    handleOnChange(e) {
        const {handleOnChange} = this.props;
        if (handleOnChange) {
            handleOnChange(e.target.name, e.target.value);
        }
    }
    IntentionCityControl(item, IntentionCity){
        if(item.businesstype === "0") { 
            return ( <Sdropdown 
                                               defaultValue={ 2 }
                                               list={ IntentionCity }
                                               name='IntentionCity'
                                               onChange = { this.handleOnChange }
                                               value={ item.IntentionCity } />)
        }
        return ( <CrmInput  value = { item.IntentionCity1 }  name = 'IntentionCity1' onChange = { this.handleOnChange } /> )
    }
    render() {
        const {businesstype, item, followresultList, customertype, sex, IntentionCity ,cuestage, accounttype} = this.props;
        let btnSave = null ;
        let customertype1 = [];
        let customerrequired= true;
      
        if(item.cuestage == "3"){
            customerrequired =false;
        }
        let AccountTypeFrom =
        (<CrmInputForm
                      hasFeedback={ false }
                      style={ {    "marginBottom": 0} }  required={ false }>
            <CrmLabel label="客户类别" />
            <CrmInputDiv required={ false }>
                    <Sdropdown
                           name = 'accounttype'
                           value={ item.accounttype }
                           onChange = { this.handleOnChange }
                           list={ accounttype } />
                
            </CrmInputDiv>
        </CrmInputForm>);
        if(item.businesstype === "0") {
            
           customertype1 = _.reject(customertype, function(type){ return type.value  ==  2});
        }
        else if(item.businesstype === "1"){
 
            customertype1 = _.reject(customertype, function(type){ return type.value  == 0});
        }
        var isconversion = 'fields';
        if(!item.isconversion === false) {
            isconversion += ' hide';
        }
        return (<form
                      {...this.props}
                      className="form-horizontal ui form" ref ='SalesFollowTaskForm'>
                    <Grid
                          fluid={ true }
                          style={ {  "marginTop": "10px"} }>
                        <Row className={ isconversion }><Col
                             xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }><h4><b style= {{ color : '#2185D0'}}>线索</b></h4></Col></Row>
                    <Row className={ isconversion }>
                        <Col
                             xs={ 4 }
                             md={ 4 }
                             sm={ 4 }
                             lg={ 4 }>
                            <CrmInputForm hasFeedback={ false } required={ true } >
                                <CrmLabel label="姓名" />
                                <CrmInputDiv>
                                    <CrmInput  value = { item.name }  name = 'name' onChange = { this.handleOnChange } />
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
                                          style={ {    "marginBottom": 0} }  required={ false }>
                                <CrmLabel label="线索阶段"  style ={{ paddingRight:'22.4px'}} />
                                <CrmInputDiv>
                                 
                                    <Sdropdown 
                                               className ='disabled'
                                               defaultValue={ 2 }
                                               list={ cuestage }
                                               name='cuestage'
                                               onChange = { this.handleOnChange }
                                               value={ item.cuestage } />
                                    
                                </CrmInputDiv>
                            </CrmInputForm>
                        </Col>
                        <Col
                             xs={ 4 }
                             md={ 4 }
                             sm={ 4 }
                             lg={ 4 }>
                            { AccountTypeFrom }
                        </Col>
                    </Row>
                    <Row className={ isconversion }>
                        <Col
                             xs={ 4 }
                             md={ 4 }
                             sm={ 4 }
                             lg={ 4 }>
                             <CrmInputForm
                                          hasFeedback={ false }
                                          style={ {    "marginBottom": 3} }  required={ customerrequired } >
                                <CrmLabel label="业务类型"  />
                                <CrmInputDiv >
                                    <Sdropdown 
                                               defaultValue={ 2 }
                                               list={ businesstype }
                                               name='businesstype'
                                               onChange = { this.handleOnChange }
                                               value={ item.businesstype } />
                                
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
                                          style={ {    "marginBottom": 0} }  required={ customerrequired }>
                                <CrmLabel label="客户类型" />
                                <CrmInputDiv>
                                 
                                        <Sdropdown
                                               name = 'customertype'
                                               value={ item.customertype }
                                               onChange = { this.handleOnChange }
                                               list={ customertype1 } />
                                    
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
                                          style={ { "marginBottom": 0} }  required={ false }>
                                <CrmLabel label="意向城市" />
                                <CrmInputDiv>
                                 
                                   { this.IntentionCityControl(item, IntentionCity) }
                                    
                                </CrmInputDiv>
                            </CrmInputForm>
                        </Col>
                    </Row>
                    <Row className={ isconversion }>
                        <Col
                             xs={ 4 }
                             md={ 4 }
                             sm={ 4 }
                             lg={ 4 }>
                               <CrmInputForm hasFeedback={ false }>
                                <CrmLabel label="电子邮件"  style ={{paddingRight:'22.4px'}}/>
                                <CrmInputDiv>
                                    <CrmInput value={ item.emailaddress1 } name='emailaddress1' onChange = { this.handleOnChange } />
                                </CrmInputDiv>
                            </CrmInputForm>
                        </Col>
                        <Col
                             xs={ 8 }
                             md={ 8 }
                             sm={ 8 }
                             lg={ 8 }>
                            <CrmInputForm hasFeedback={ false }>

                                <CrmLabel 
                                        style= {{ width: '12%', paddingRight:'22.4px'}}
                                          label="地址" />
                                <CrmInputDiv  style={{ width: '88%' }}>
                                    <CrmInput value = { item.address } onChange = { this.handleOnChange } name='address' />
                                </CrmInputDiv>
                            </CrmInputForm>
                        </Col>
                    </Row>
                    <Row><Col
                             xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }><h4><b style= {{ color : '#2185D0'}}>跟进</b></h4></Col></Row>
                    <Row  className = "fields">
                    <Col
                             xs={ 8 }
                             md={ 8 }
                             sm={ 8 }
                             lg={ 8 }>
                            <CrmInputForm hasFeedback={ false } required={ true }>

                                <CrmLabel 
                                        style= {{ width: '12%'}}
                                          label="主题" />
                                <CrmInputDiv  style={{ width: '88%' }}>
                                    <CrmInput defaultValue = { item.theme } onChange = { this.handleOnChange } name='theme' />
                                </CrmInputDiv>
                            </CrmInputForm>
                        </Col>
                        <Col
                             xs={ 4 }
                             md={ 4 }
                             sm={ 4 }
                             lg={ 4 }>
                               <CrmInputForm hasFeedback={ false } required={ true }>
                                <CrmLabel label="跟进阶段" />
                                <CrmInputDiv>
                                    <Sdropdown value={ item.followresult }  required={ true }  name='followresult' list = { followresultList } onChange={ this.handleOnChange }/>
                                </CrmInputDiv>
                            </CrmInputForm>
                        </Col>
                    </Row>
                    <Row className = "fields">
                        <Col
                             xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }>
                            <CrmInputForm hasFeedback={ false } required={ true }>
                                <CrmLabel
                                          label="跟进详情"
                                          labelClassName="col-xs-1" />
                                <CrmInputDiv className="col-xs-11" style = {{ paddingLeft: '10px'}}>
                                    <Textarea
                                              value={ item.content } name = 'content' rows='4'
                                              onChange={ this.handleOnChange } />
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
                            <LoadingButton
                                    bsStyle="primary"
                                    onClick={ this.handleOnSave }>
                                <span>保存</span>
                            </LoadingButton>
                        </Col>
                    </Row>
                </Grid>
            </form>);
    }
}
SalesFollowTask.defaultProps = {
    item: {
        name: '',
        content: ''
    }
};
SalesFollowTask.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.string
    }),
    handleOnSave: PropTypes.func,
    handleOnChange: PropTypes.func,
    followresultList: PropTypes.array
};

export default SalesFollowTask;
