import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';
import CrmInput from '../CrmWeb/CrmInput.jsx';
import CrmLabel from '../CrmWeb/CrmLabel.jsx';
import CrmInputForm from '../CrmWeb/CrmInputForm.jsx';
import CrmInputDiv from '../CrmWeb/CrmInputDiv.jsx';
import Textarea from '../CustomHtml/Textarea.jsx';
import Sdropdown from '../semanticui/Sdropdown.jsx';
import DateTimePickerWrapper from '../Widgets/DateTimePickerWrapper.jsx';
import LoadingButton from '../CrmWeb/LoadingButton.jsx';
import common from '../../common/common.js';
class VisitPlan extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlerOnSave = this.handlerOnSave.bind(this);
        this.handlerOnChange = this.handlerOnChange.bind(this);
        this.handlerOnNew = this.handlerOnNew.bind(this);
        this.OnIsValid = this.OnIsValid.bind(this);
    }
    handlerOnSave(e) {
        e.preventDefault();
        e.stopPropagation();
        if(this.OnIsValid()) {
            const {handlerOnSave, item} = this.props;
            if (handlerOnSave) {
                handlerOnSave(item);
            }
        }
    }
    OnIsValid() {
      
        const item = this.props.item;
        var ValidList =  {"visittime":"下次回访时间"}
        if(common.getTemp().entityName !='phonecall') {
           ValidList = Object.assign(ValidList, { "phonenumber" :"联系电话"});
        }
        ValidList = Object.assign(ValidList, {"description":"说明"});
     
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
    handlerOnChange(e) {
        const {item} = this.props;
        const { handlerOnChange} = this.props;
        if (handlerOnChange) {
            item.State = 0;
            if(e instanceof Date){
                handlerOnChange('visittime', e)
            }
            else {
            handlerOnChange(e.target.name,e.target.value);
            }
        }
    }
    handlerOnNew(e) {
        e.preventDefault();
        e.stopPropagation();
        const { handlerOnNew} = this.props;
        if (handlerOnNew) {
            handlerOnNew();
        }
    }
    render() {
      const {item} = this.props;
      var phonenumberDiv = [];
      if(common.getTemp().entityName == 'phonecall') {
        phonenumberDiv = [];
      }
      else {
           phonenumberDiv = (<div> <CrmLabel
                                              label="联系电话"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-4">
                                       <input value={ item.phonenumber } name='phonenumber' onChange={ this.handlerOnChange } />
                                    </CrmInputDiv> </div>)

      }

        return (<form
                      {...this.props}
                      className="form-horizontal ui form" ref ='VisitPlanForm'>
                    <Grid
                          fluid={ true }
                          style={ {  "marginTop": "10px"} }>                       
                        <Row className="col-xs-12 fields">
                            <Col
                                 xs={ 12 }
                                 md={ 12 }
                                 sm={ 12 }
                                 lg={ 12 }>
                                <CrmInputForm hasFeedback={ false } required={ true }>
                                  <CrmLabel
                                              label="下次回访时间"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-4">
                                         <DateTimePickerWrapper  min = { new Date() } value={ item.visittime } name='visittime' onChange={ this.handlerOnChange } format="YYYY/MM/DD HH:mm:ss" />
                                    </CrmInputDiv>
                                    {
                                      phonenumberDiv
                                    }
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
                                    <CrmLabel
                                              label="说明"
                                              labelClassName="col-xs-2" />
                                    <CrmInputDiv className="col-xs-10">
                                        <Textarea
                                                  style={ { "height": "100px"} }
                                                  value={ item.description } 
                                                  name="description" 
                                                  onChange={ this.handlerOnChange } />
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
                                        <Button bsStyle="primary" onClick={ this.handlerOnNew }>
                                            <span>新建</span>
                                        </Button>
                                    </Col>
                                    <Col className =  {   item.State === 2 ? "hidden" :""  }
                                         xs={ 3 }
                                         md={ 3 }
                                         sm={ 3 }
                                         lg={ 3 }>
                                        <LoadingButton bsStyle="primary" onClick={ this.handlerOnSave }>
                                            <span>保存</span>
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
                </form>);
    }
}
VisitPlan.defaultProps = {

};
VisitPlan.propTypes = {
    item: PropTypes.shape({
        description: PropTypes.string,
        phonenumber: PropTypes.string,
        No: PropTypes.number
    }),
    handlerOnSave: PropTypes.func,
    handlerOnNew: PropTypes.func,
    handlerOnChange: PropTypes.func
};

export default VisitPlan;
