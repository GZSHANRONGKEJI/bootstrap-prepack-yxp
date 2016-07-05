import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap';
//import DateTimePickerWrapper from '../Widgets/DateTimePickerWrapper.jsx';
import CrmInput from '../CrmWeb/CrmInput.jsx';
import CrmLabel from '../CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../CrmWeb/CrmInputDiv.jsx';
import Textarea from '../CustomHtml/Textarea.jsx';
import Sdropdown from '../semanticui/Sdropdown.jsx';
import SdropdownMultistag from '../semanticui/SdropdownMultistag.jsx';
import common from '../../common/common.js';
import LoadingButton from '../CrmWeb/LoadingButton.jsx';
class ProblemRecord extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handlerOnRecordChange = this.handlerOnRecordChange.bind(this);
        this.handlerOnRecordNew = this.handlerOnRecordNew.bind(this);
        this.OnIsValid = this.OnIsValid.bind(this);

    }
    componentWillUpdate(nextProps, nextState) {
        if(nextProps.item.Id == this.props.item.Id && !_.isEqual(nextProps.item, this.props.item)) {
            nextProps.item.State = 0;
        }
    }
    componentDidMount() {

    }
    OnIsValid() {
     
        const item = this.props.item;
        if(item.CustomerCategory == "14") {
          return true;
        }
        var ValidList =  {"Theme":"主题", "QuestionType2":"已选问题类别","Processingmode":"问题处理方式", 
        "LargeArea":"问题所属大区","CustomerCategory":"客户类别"}
        if(item.cuestage != "3") {
           ValidList = Object.assign(ValidList, { "LargeArea":"问题所属大区"});
        }
        if(common.getTemp().entityName !='phonecall') {
           ValidList = Object.assign(ValidList, { "members" :"关联会员","usephone":"联系电话"});
        }
        ValidList = Object.assign(ValidList, {"ProblemDescription":"问题描述"});
        if(item.Processingmode === "0") {
            ValidList = Object.assign(ValidList, { "Feedback" :"问题反馈"});
        }
      
        var isValid = true;
        for(var i in ValidList) {
          var ppValue = item[i];
          if(ppValue == "" || ppValue == null){
            common.alert(ValidList[i] + "不允许为空");
            isValid = false;
            return;
          }

        }
        return isValid;
    }
    handleOnSubmit(e) {

        e.preventDefault();
        e.stopPropagation();
        
        if(this.OnIsValid()) {
            const {handleOnSubmit, item, questionCategory} = this.props;
            this.saveProcessing(questionCategory, item);
            if (handleOnSubmit) {
                handleOnSubmit(item);
            }
        }
    }
    findCategory(questionCategory, QuestionType) {

        var array = [];
        questionCategory.map((item) => {
            if(item.value == QuestionType) {
               array.push({ text:item.text, value:item.value });
            }
            if (item.menu) {
                var currValue = (this.findCategory(item.menu, QuestionType));
                if(currValue.length > 0) {
                     array.push({ text:item.text, value:item.value });
                     currValue.map(item1=> array.push(item1))
                }
            }
        });
        return array;
    }
    saveProcessing(questionCategory, value) {
        var QuestionType2 = value.QuestionType2;
        if(QuestionType2) {
            var QuestionArray = this.findCategory(questionCategory, QuestionType2);
                for (var i = 0; i < QuestionArray.length; i++) {
                    if( i === 0){
                        value.QuestionType = QuestionArray[i].value;
                        value.QuestionTypeName = QuestionArray[i].text;
                    }
                    else if(i === 1) {
                        value.QuestionType1 = QuestionArray[i].value;
                        value.QuestionTypeName1 = QuestionArray[i].text;
                    }
                    else if(i ===2) {
                        value.QuestionType2 = QuestionArray[i].value;
                        value.QuestionTypeName2 = QuestionArray[i].text;
                    }
                };
        }
        value.QuestionTypeNameStr = value.QuestionTypeName + "-" + value.QuestionTypeName1 + "-" + value.QuestionTypeName2;
        return value;
    }
    handleOnSave(e) {
        e.preventDefault();
        e.stopPropagation();
        if(this.OnIsValid()) {
          const {handleOnSave, item, questionCategory} = this.props;
          this.saveProcessing(questionCategory, item);
          if (handleOnSave) {
              handleOnSave(item);
          }
        }
    }
    handlerOnRecordChange(e) {
        const {item} = this.props;
        if(item.State === 2) {
            return;
        }
        const { handlerOnRecordChange} = this.props;
        if (handlerOnRecordChange) {
            handlerOnRecordChange(e.target.name, e.target.value);
        }
    }
    handlerOnRecordNew(e) {
        e.preventDefault();
        e.stopPropagation();
        const { handlerOnRecordNew} = this.props;
        if (handlerOnRecordNew) {
            handlerOnRecordNew();
        }
    }
    render() {
      const {item, clientclass, processingmode, questionCategory, LargeArea, membersList} = this.props;
      var customer = [] ;
      var required = true;
      var LArequired = true;
      var LargeAreaDiv= [];
      LargeAreaDiv = [(<CrmLabel label="问题所属大区" labelClassName="col-xs-2"  />), (
                <CrmInputDiv className="col-xs-2">
                  <Sdropdown   required={ required && LArequired } value={ item.LargeArea } name="LargeArea" onChange={ this.handlerOnRecordChange } list = { LargeArea } />
                </CrmInputDiv>)];
      if(common.getTemp().entityName =='phonecall') {
            customer = [];

          
      }
      else {
          customer = [(<CrmLabel label="关联会员" labelClassName="col-xs-2" />),
                        (<CrmInputDiv className="col-xs-3">
                        <Sdropdown   required={ true } value={ item.members }  name='members' list = { membersList } onChange={ this.handlerOnRecordChange }/>
                       </CrmInputDiv>)
                        ,(<CrmLabel label="联系电话" labelClassName="col-xs-1" />),
                        (<CrmInputDiv className="col-xs-2">
                             <CrmInput  value = { item.usephone } name='usephone' onChange={ this.handlerOnRecordChange } />
                          </CrmInputDiv>)];
          
      }
      if(item.cuestage == "3") {
        LArequired =false;
      }
      if(item.CustomerCategory == "14") {
         required = false;
      }
   
        return (<form
                      {...this.props}
                      className="form-horizontal ui form" ref ='ProblemRecordform'>
                    <Grid
                          fluid={ true }
                          style={ {  "marginTop": "10px"} }>
                        <Row className="col-xs-12 fields">
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmInputForm hasFeedback={ false } required={ required }>
                                    <CrmLabel
                                              label="主题"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-10">
                                        <CrmInput
                                                  value={ item.Theme } 
                                                  name="Theme" 
                                                  onChange={ this.handlerOnRecordChange } />
                                    </CrmInputDiv>
                                </CrmInputForm>
                            </Col>
                        </Row>
                       
                        <Row className="col-xs-12  fields">
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmInputForm
                                              hasFeedback={ false }
                                              required={ required }>
                               
                                    <CrmLabel
                                              label="已选问题类别"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-2">
                                        <SdropdownMultistag value={ item.QuestionType2 }  list = { questionCategory } name="QuestionType2" onChange={ this.handlerOnRecordChange }/>
                                    </CrmInputDiv>
                                    <CrmLabel
                                              label="问题处理方式"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-2 ">
                                        <Sdropdown   required={ required } value={ item.Processingmode }  name="Processingmode" list= { processingmode }  onChange={ this.handlerOnRecordChange } />
                                    </CrmInputDiv>
                                    <CrmLabel
                                              label="客户类别"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-2 ">
                                        <Sdropdown   required={ true } value={ item.CustomerCategory }  name="CustomerCategory" list= { clientclass }  onChange={ this.handlerOnRecordChange } />
                                    </CrmInputDiv>

                               
                                </CrmInputForm>
                            </Col>
                        </Row>
                        <Row className="col-xs-12 fields">
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                
                                <CrmInputForm hasFeedback={ false } required={ true }>
                                  { customer }
                                  {LargeAreaDiv}
                                </CrmInputForm>
                            </Col>
                        </Row>
                        <Row className="col-xs-12 fields">
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmInputForm hasFeedback={ false } required={ required }>
                                    <CrmLabel
                                              label="问题描述"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-10">
                                        <Textarea
                                                  style={ { "height": "100px"} }
                                                  value={ item.ProblemDescription } 
                                                  name="ProblemDescription" 
                                                  onChange={ this.handlerOnRecordChange } />
                                    </CrmInputDiv>
                                </CrmInputForm>
                            </Col>
                        </Row>
                        <Row className="col-xs-12 fields">
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmInputForm hasFeedback={ false } className = { item.Processingmode === "0"  ? "": "disabled" } required={ item.Processingmode === "0" && required ? true : false }>
                                    <CrmLabel
                                              label="问题反馈"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-10">
                                        <Textarea
                                                  style={ {    "height": "100px"} }
                                                  value={ item.Feedback } 
                                                  name="Feedback" 
                                                  onChange={ this.handlerOnRecordChange } />
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
                                        <Button bsStyle="primary" onClick={ this.handlerOnRecordNew }>
                                            <span>新建</span>
                                        </Button>
                                    </Col>
                                    <Col className =  {   item.State === 2 ? "hidden" :""  }
                                         xs={ 3 }
                                         md={ 3 }
                                         sm={ 3 }
                                         lg={ 3 }>
                                        <LoadingButton bsStyle="primary" onClick={ this.handleOnSave }>
                                            <span>保存</span>
                                        </LoadingButton>
                                    </Col>
                                    <Col className =  {   item.State === 2 || item.Processingmode === "2" ? "hidden" :""  }
                                         xs={ 3 }
                                         md={ 3 }
                                         sm={ 3 }
                                         lg={ 3 }>
                                        <LoadingButton bsStyle="primary" onClick={ this.handleOnSubmit }>
                                            <span>提交</span>
                                        </LoadingButton>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                 xs={ 3 }
                                 md={ 3 }
                                 sm={ 3 }
                                 lg={ 3 } />
                        </Row>
                    </Grid>
                </form>
            );
      
      
    }
}
ProblemRecord.defaultProps = {
    item: {
        QuestionTypeName2: '',
        CustomerCategory: '',
        Processingmode: '',
        LargeArea: '',
        VisitTime: '',
        ProblemDescription: '',
        Feedback: ''
    },
    clientclass:[],
    questionCategory:[],
    processingmode:[],
    LargeArea:[],
    membersList:[]

};
ProblemRecord.propTypes = {
    item: PropTypes.shape({
        QuestionTypeName2: PropTypes.string,
        CustomerCategory: PropTypes.string,
        Processingmode: PropTypes.string,
        LargeArea: PropTypes.string,
        VisitTime: PropTypes.datetime,
        ProblemDescription: PropTypes.string,
        Feedback: PropTypes.string
    }),
    questionCategory: PropTypes.array,
    clientclass:PropTypes.array,
    
    processingmode:PropTypes.array,
    handleOnSubmit: PropTypes.func,
    handleOnSave: PropTypes.func,
    handlerOnRecordChange:PropTypes.func,
    LargeArea: PropTypes.array,
    membersList: PropTypes.array
};

export default ProblemRecord;
