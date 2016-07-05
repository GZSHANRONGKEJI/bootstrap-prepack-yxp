import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button } from 'react-bootstrap';
import CrmPanelGroup from '../CrmWeb/CrmPanelGroup.jsx';
import CrmInput from '../CrmWeb/CrmInput.jsx';
import CrmLabel from '../CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../CrmWeb/CrmInputDiv.jsx';
import Sdropdown from '../semanticui/Sdropdown.jsx';
import common from '../../common/common.js';

class CustomerInfo extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.OnIsValid = this.OnIsValid.bind(this);
    }
    componentDidMount() {

        
    }
    handleOnSave(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if(this.OnIsValid()) {
            const {handleOnCustomerSave, CustomeData} = this.props;
            if (handleOnCustomerSave) {
                handleOnCustomerSave(CustomeData);
            } 
        }
    }
    OnIsValid() {
        const { CustomeData:item } = this.props;
         
        var customer =  {"name":"姓名","customertype":"客户类型","businesstype":"业务类型"}
        if(item.cuestage == "2") {
            if(item.businesstype === "0") {
               customer= Object.assign(customer,{"IntentionCity":"意向城市"});
            }
            else if(item.businesstype === "1"){
                customer= Object.assign(customer,{"IntentionCity1":"意向城市" });
            }
            customer= Object.assign(customer,{"accounttype":"客户类别"});
        }   
        if(item.cuestage == "3"){
            customer={"name":"姓名"};
               
        }
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
    handleOnChange(e){
        e.preventDefault();
        e.stopPropagation();
        const { handleOnCustomerChange} = this.props;
        if (handleOnCustomerChange) {
            handleOnCustomerChange(e.target.name, e.target.value);
        }
       
    }
    IntentionCityControl(CustomeData, IntentionCity){
        if(CustomeData.businesstype === "0") { 
            return ( <Sdropdown 
                                               defaultValue={ 2 }
                                               list={ IntentionCity }
                                               name='IntentionCity'
                                               onChange = { this.handleOnChange }
                                               value={ CustomeData.IntentionCity } />)
        }
        return ( <CrmInput  value = { CustomeData.IntentionCity1 }  name = 'IntentionCity1' onChange = { this.handleOnChange } /> )
    }
    render() {
        const {businesstype, CustomeData, customertype, sex, IntentionCity ,cuestage, accounttype} = this.props;
        let btnSave = null ;
        let customertype1 = [];
        let customerrequired= true;
      
        if(CustomeData.cuestage == "3"){
            customerrequired = false;
        }
        let AccountTypeFrom =
        (<CrmInputForm
                      hasFeedback={ false }
                      style={ {    "marginBottom": 0} }  required={ customerrequired && CustomeData.cuestage =='2' }>
            <CrmLabel label="客户类别" />
            <CrmInputDiv>
                    <Sdropdown
                           name = 'accounttype'
                           value={ CustomeData.accounttype }
                           onChange = { this.handleOnChange }
                           list={ accounttype } />
                
            </CrmInputDiv>
        </CrmInputForm>);
                    //savestate  2 正在保存  1 已保存
        if(CustomeData.savestate == '1')
        {
            btnSave = (<button className="btn btn-sm ui primary button" onClick={ this.handleOnSave }>
                                    <span>保存</span></button>);
        }
        else if(CustomeData.savestate == '2') {
             btnSave = (<button disabled className="btn btn-sm ui primary loading disabled button" onClick={ this.handleOnSave }>
                                    <span>保存中...</span></button>);
        }
        if(CustomeData.businesstype === "0") {
            
           customertype1 = _.reject(customertype, function(type){ return type.value  ==  2});
        }
        else if(CustomeData.businesstype === "1"){
            customertype1 = _.reject(customertype, function(type){ return type.value  == 0});
        }
      
        return (<CrmPanelGroup
                               {...this.props}
                               header="添加线索" ref = 'customerform' bsStyle = "default" >
                    
                    <Row className="fields">
                        <Col
                             xs={ 4 }
                             md={ 4 }
                             sm={ 4 }
                             lg={ 4 }>
                            <CrmInputForm hasFeedback={ false } required={ true } >
                                <CrmLabel label="姓名" />
                                <CrmInputDiv>
                                    <CrmInput  value = { CustomeData.name }  name = 'name' onChange = { this.handleOnChange } />
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
                                               defaultValue={ 2 }
                                               list={ cuestage }
                                               name='cuestage'
                                               onChange = { this.handleOnChange }
                                               value={ CustomeData.cuestage } />
                                    
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
                    <Row className="fields">
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
                                               value={ CustomeData.businesstype } />
                                
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
                                <CrmInputDiv required={ true }>
                                 
                                        <Sdropdown
                                               name = 'customertype'
                                               value={ CustomeData.customertype }
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
                                          style={ { "marginBottom": 0} }  required={ customerrequired && CustomeData.cuestage =='2' }>
                                <CrmLabel label="意向城市" />
                                <CrmInputDiv>
                                 
                                   { this.IntentionCityControl(CustomeData, IntentionCity) }
                                    
                                </CrmInputDiv>
                            </CrmInputForm>
                        </Col>
                    </Row>
                    <Row className="fields">
                        <Col
                             xs={ 4 }
                             md={ 4 }
                             sm={ 4 }
                             lg={ 4 }>
                               <CrmInputForm hasFeedback={ false }>
                                <CrmLabel label="联系电话"  style ={{paddingRight:'22.4px'}}/>
                                <CrmInputDiv>
                                    <CrmInput value={ CustomeData.phone1 } name='phone1' onChange = { this.handleOnChange } />
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
                                          label="备注" />
                                <CrmInputDiv  style={{ width: '88%' }}>
                                    <CrmInput defaultValue = { CustomeData.remark } onChange = { this.handleOnChange } name='remark' />
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
                             xs={ 6 }
                             md={ 6 }
                             sm={ 6 }
                             lg={ 6 }>
                            <Row>
                                <Col
                                     xs={ 3 }
                                     md={ 3 }
                                     sm={ 3 }
                                     lg={ 3 }>
                                    { btnSave }
                                </Col>
                            </Row>
                        </Col>
                        <Col
                             xs={ 3 }
                             md={ 3 }
                             sm={ 3 }
                             lg={ 3 } />
                    </Row>
                </CrmPanelGroup>
            );
    }

}
CustomerInfo.defaultProps = {
    businesstype: [],
    CustomeData: {
        businesstype: '',
        name: '',
        IntentionCity: '',
        phone1: '',
        remark: '',
        customertype: ''
    },
    customertype: [],
    sex: []
};
CustomerInfo.propTypes = {
    businesstype: PropTypes.array,
    CustomeData: PropTypes.shape({
        businesstype: PropTypes.string,
        name: PropTypes.string,
        IntentionCity: PropTypes.string,
        phone1: PropTypes.string,
        remark: PropTypes.string,
        customertype: PropTypes.string,
        LargeArea: PropTypes.array

    }),
    customertype: PropTypes.array,
    IntentionCity: PropTypes.array,
    sex: PropTypes.array,
    handleOnCustomerSave: PropTypes.func
};

export default CustomerInfo;
