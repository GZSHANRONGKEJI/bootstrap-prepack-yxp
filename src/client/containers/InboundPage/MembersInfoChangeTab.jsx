import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { request } from '../../api/serverApi.js';
import common from '../../common/common.js';
import MembersInfoChange from '../../components/InboundPage/MembersInfoChange.jsx';
import { handlersOnMembersInfoChangeLoad, handlersOnMembersInfoChangeChange, handlersOnMembersInfoChangeSave, handlersOnMembersInfoChangeSubmit } from '../../actions/index.js';

class MembersInfoChangeTab extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlerOnLoad = this.handlerOnLoad.bind(this);
        this.handlerOnChange = this.handlerOnChange.bind(this);
        this.handlerOnSave = this.handlerOnSave.bind(this);
        this.handlerOnSubmit = this.handlerOnSubmit.bind(this);
        this.LargeArea = [];
        this.province = [];
        this.Index = 0;

    }
    componentDidMount() {
        const {dispatch} = this.props;
        if(common.getTemp().entityName === 'phonecall') {
           
            window.parent.Xrm.Page.getAttribute('xin_customerid').addOnChange(()=>{
                var id = common.getCrmEntityAttr('xin_customerid');
                if(id) {
                    var request = { 'OpportunityId':id};
                    this.handlerOnLoad(request);
                }

            }, false);//绑定字段更改事件
            var id = common.getCrmEntityAttr('xin_customerid');
                if(id) {
                var request = { 'OpportunityId':id};
                this.handlerOnLoad(request);
            }
        }
       

    }

    handlerOnLoad(request) {
        const {dispatch} = this.props;
        dispatch(handlersOnMembersInfoChangeLoad(request));
    }
    handlerOnChange(name, value) {
        const {dispatch} = this.props;
        dispatch(handlersOnMembersInfoChangeChange(name, value));
    }
    handlerOnSave(item) {
        const {dispatch} = this.props;
        dispatch(handlersOnMembersInfoChangeSave(item));
    }
    handlerOnSubmit(item) {
        const {dispatch} = this.props;
        dispatch(handlersOnMembersInfoChangeSubmit(item));
    }
    
    render() {
        var {field, followresultList, item, LargeArea, customertype, businesstype, province, city, sellertype, completionstate,managementtype,pricerangetype,vendorclasscategorytype,customeridentitytype } = this.props;
        var LargeArea = this.LargeArea;
        var province = this.province;
        if(item.xin_province && city.length === 0 && this.Index === 0){
            request.post('AccMgr/OpportunityService.svc/GetProvinceOrCityInfo',{Type1: 2, ProvinceId: item.xin_province}, !1).then(response => {
                    const { returnValue, message } = response.d || response;
                    if(returnValue) {
                         const { req : { list } } = JSON.parse(message);
                         city = list;
                    } 
            });
            this.Index ++;
        }
        if(LargeArea.length === 0 ) {
            request.post('AccMgr/OpportunityService.svc/GetBusinessUnit','', !1).then(response => {
                    const { returnValue, message } = response.d || response;
                    if(returnValue) {
                         const { req : { businessunitlist } } = JSON.parse(message);
                         LargeArea = businessunitlist;
                    } 
            });
            this.LargeArea = LargeArea;
        }
        if(province.length === 0 ) {
            request.post('AccMgr/OpportunityService.svc/GetProvinceOrCityInfo',{Type1: 1}, !1).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                     const { req : { list } } = JSON.parse(message);
                     province = list;
                } 
            });
            this.province = province;
        }
        
        return (<div  {...this.props}>
                    <MembersInfoChange
                                    className="form-horizontal ui form"
                                    handlerOnSave = { this.handlerOnSave } 
                                    handlerOnChange = { this.handlerOnChange }
                                    handlerOnSubmit = { this.handlerOnSubmit }
                                    item = { item }
                                    customertype = { customertype } 
                                    businesstype = { businesstype }
                                    LargeArea = { LargeArea }
                                    field = { field }
                                    province = { province }
                                    city = { city }
                                    sellertype = { sellertype }
                                    followresultList = { followresultList }
                                    completionstate ={ completionstate}
                                    managementtype = {managementtype} 
                                    pricerangetype = {pricerangetype} 
                                    vendorclasscategorytype = {vendorclasscategorytype}
                                    customeridentitytype={customeridentitytype} />
                </div>
            );
    }
}
function mapStateToProps(state) {
    const {MemberInfoTab: {field, item, LargeArea, province, city}, Option : { followresultList,customertype, businesstype, sellertype, completionstate,managementtype,pricerangetype,vendorclasscategorytype,customeridentitytype  } } = state;
    return {
        field,
        item,
        followresultList,
        LargeArea,
        customertype,
        businesstype,
        province,
        city,
        sellertype,
        completionstate,
        managementtype,
        pricerangetype,
        vendorclasscategorytype,
        customeridentitytype
    };
}

export default connect(mapStateToProps)(MembersInfoChangeTab);
