import { createAction, handleActions } from '../reduxActionsSequence';
import common from '../../common/common.js';
import { request } from '../../api/serverApi.js';
const HANDLERS_ON_MEMBERS_INFO_CHANGE_LOAD = 'HANDLERS_ON_MEMBERS_INFO_CHANGE_LOAD';
const HANDLERS_ON_MEMBERS_INFO_CHANGE_CHANGE = 'HANDLERS_ON_MEMBERS_INFO_CHANGE_CHANGE';
const HANDLERS_ON_MEMBERS_INFO_CHANGE_SAVE = 'HANDLERS_ON_MEMBERS_INFO_CHANGE_SAVE';
const HANDLERS_ON_MEMBERS_INFO_CHANGE_SUBMIT = 'HANDLERS_ON_MEMBERS_INFO_CHANGE_SUBMIT';

export const handlersOnMembersInfoChangeLoad = createAction(HANDLERS_ON_MEMBERS_INFO_CHANGE_LOAD, (query) => {
    return new Promise((resolve, reject) => {
        request.post('AccMgr/OpportunityService.svc/GetOpportunityInfo', query).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                    const { req : { list } } = JSON.parse(message);
                    var coustome =  _.find(list) || {} 
                    coustome.xin_OppId = query.OpportunityId;
                    coustome.ownerid = common.getCrmEntityAttr('ownerid');
                    coustome.state = "0";
                    resolve(coustome);
                }
                else {
                    reject(response.d);
                }
            },error => {
                reject(error);

        });
    });
});
export const handlersOnMembersInfoChangeChange = createAction(HANDLERS_ON_MEMBERS_INFO_CHANGE_CHANGE, (name, value) => {
        var obj = {} ;
        obj[name] = value; 
        return obj;
});
export const handlersOnMembersInfoChangeSave = createAction(HANDLERS_ON_MEMBERS_INFO_CHANGE_SAVE, item => {
    return new Promise((resolve, reject) => {
        item.phonecallid = common.getTemp().phonecallid;
        request.post('AccMgr/OpportunityService.svc/CreateOrUpdateOppChange',{request: item}).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                    common.alert('保存成功');
                    resolve(Object.assign( {"OppChangeId": message}));
                }
                else {
                    reject(response.d);
                }
            },error => {
                reject(error);
        });
    });
});
export const handlersOnMembersInfoChangeSubmit = createAction(HANDLERS_ON_MEMBERS_INFO_CHANGE_SUBMIT, item => {
    return new Promise((resolve, reject) => {
         item.phonecallid = common.getTemp().phonecallid;
        request.post('AccMgr/OpportunityService.svc/CreateOrUpdateOppChange',{request: item}).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                   
                    request.post('AccMgr/OpportunityService.svc/Submit',{entityid: message}).then(response1 => {
                        const { returnValue } = response1.d || response1;
                        if(returnValue) {
                           common.alert('提交成功');
                           resolve(Object.assign( {"OppChangeId": message, state : "2"}));
                        }
                        else{
                            reject({message :"提交失败"});
                        }
                    });
                    
                }
                else {
                    reject(response.d);
                }
            },error => {
                reject(error);
        });
    });
});

export default handleActions({

    [HANDLERS_ON_MEMBERS_INFO_CHANGE_LOAD]: {
        start(state, action) {
           
            return state;
        },
        next(state, action) {
            state.item = Object.assign({}, state.item, action.payload);
            state = Object.assign({}, state);
            return state;
        },
        throw(state, action) {
            common.alert(action.payload.message);
            return state;
        }
    },
    [HANDLERS_ON_MEMBERS_INFO_CHANGE_CHANGE]: (state, action) => {
        if(action.payload.xin_province != undefined) {
            state.city = [];
            action.payload.city = '';
            if(action.payload.xin_province) {
                request.post('AccMgr/OpportunityService.svc/GetProvinceOrCityInfo',{Type1: 2, ProvinceId: action.payload.xin_province}, !1).then(response => {
                    const { returnValue, message } = response.d || response;
                    if(returnValue) {
                         const { req : { list } } = JSON.parse(message);
                         state.city = list;
                    } 
                });
            }
        }
        if(action.payload.businesstype != undefined) {
            action.payload.customertype = ""; 
        }
        if(action.payload.xin_vendorclasscategory != undefined) {
            action.payload.xin_customeridentity = ""; 
        }
        state.item = Object.assign({}, state.item, action.payload);
        state = Object.assign({}, state);
        return state;
    },
    [HANDLERS_ON_MEMBERS_INFO_CHANGE_SAVE]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
            state.item = Object.assign({},state.item, action.payload);
            return state = Object.assign({}, state);
        },
        throw(state, action) {
            common.alert(action.payload.message || ' 保存失败');
            return state;
        }
    },
    [HANDLERS_ON_MEMBERS_INFO_CHANGE_SUBMIT]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
            state.item = Object.assign({},state.item, action.payload);
            return state = Object.assign({}, state);
        },
        throw(state, action) {
            common.alert(action.payload.message || ' 提交失败');
            return state;
        }
    }

}, {});
