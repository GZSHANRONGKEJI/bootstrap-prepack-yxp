import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { PanelGroup } from '../../components/Bootstrap';
import InboundCallInfo from '../../components/InboundPage/InboundCallInfo.jsx';
import common from '../../common/common.js';
import { request } from '../../api/serverApi.js';

class CallInfoRow extends Component {

    constructor(props, content) {
        super(props, content);
        var phone = common.GetQueryString('phone');
         var AreaCode = common.GetQueryString('AreaCode');
         var time = common.momentFormat(new Date());
        var belonging = "";
        if(AreaCode)
        request.post('AccMgr/PhoneCallService.svc/GetAreaCodeData',{ request : { AreaCode : AreaCode } }, 0).then(response => {
            belonging = response.d.CityName;
        }, console.log.bind(console));
        this.state = {
            phonenumber: phone,
            time:time,
            belonging: belonging,
            CallColor: "#0FF116"
        }
        this.handlerCallPhone = this.handlerCallPhone.bind(this);
    }
    componentDidMount() {

    }
    handlerCallPhone(phone) {
        this.setState({CallColor:"#F10F43"});
        if(!common.tempObj.lastphonecallid) {
            common.getTemp({lastphonecallid:common.getTemp().phonecallid})
        }
        var create = function(tape) {
            var obj = {};
            obj.phonenumber = common.getTemp().phone;
            obj.ownerid = common.getTemp().ownerid;
            obj.lastphonecallid = common.getTemp().lastphonecallid;
            obj.directioncode =  true;
            obj.fromtype = 3;
            obj = Object.assign(obj , tape);
            request.post('AccMgr/OpportunityService.svc/CreateWorkOrder',{ request : obj }).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                    const phonecallid = message;
                    common.getTemp({phonecallid: phonecallid });
                }
                else {
                   alert('创建工单失败');
                }
            });
            this.setState({CallColor:"#0FF116"});
        }
        if(!common.CallPhone(phone, create.bind(this))){
             this.setState({CallColor:"#0FF116"});

        }

    }
    render() {
        //const { item } = this.props;  
         var phone = common.GetQueryString('phone');
         var  hide = '';
         if(!phone) {
            hide= 'hide';

         }
        return (<Row className = { hide }
                     {...this.props}>
                    <Col
                         xs={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         lg={ 12 }>
                        <Grid fluid={ true }>
                            <InboundCallInfo item= { this.state } handlerCallPhone = { this.handlerCallPhone } CallColor = { this.state.CallColor} />
                        </Grid>
                    </Col>
                </Row>
            );
    }
}
function mapStateToProps(state) {
    const { } = state;
    return {
    };
}

export default connect(mapStateToProps)(CallInfoRow);
