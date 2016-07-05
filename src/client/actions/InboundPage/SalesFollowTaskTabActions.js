import { createAction, handleActions } from '../reduxActionsSequence';
import { request } from '../../api/serverApi.js';
import common from '../../common/common.js';
const HANDLE_ON_SALES_FOLLOW_TASK_CHANGE = 'HANDLE_ON_SALES_FOLLOW_TASK_CHANGE';
const HANDLE_ON_SALES_FOLLOW_TASK_SAVE = 'HANDLE_ON_SALES_FOLLOW_TASK_SAVE';
const HANDLE_ON_SALES_FOLLOW_TASK_LOAD = 'HANDLE_ON_SALES_FOLLOW_TASK_LOAD';
const HANDLE_ON_SALES_FOLLOW_TASK_CUSTOMER_CHANGE = 'HANDLE_ON_SALES_FOLLOW_TASK_CUSTOMER_CHANGE';

export const handleOnSalesFollowTaskChange = createAction(HANDLE_ON_SALES_FOLLOW_TASK_CHANGE, (name, value) => {
    return { [name]: value };
});
export const handleOnSalesFollowTaskLoad = createAction(HANDLE_ON_SALES_FOLLOW_TASK_LOAD, () => {
    return new Promise((resolve, reject) => {
        common.GetBusinessUnit().then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                  const { req : { businessunitlist } } = JSON.parse(message);
                   resolve({ LargeArea : businessunitlist });
                }
                else {
                    reject(response.d);
                }
            },error => {
                reject(error);
        });
    });
});
export const handleOnSalesFollowTaskSave = createAction(HANDLE_ON_SALES_FOLLOW_TASK_SAVE, item => {
    return new Promise((resolve, reject) => {
        item.phonecallid =  common.getTemp().phonecallid;
        item.phonenumber = common.getTemp().phone;
        item.phone1 = common.getTemp().phone;
        item.ownerid = common.getTemp().ownerid;
        item.oppid = common.getCrmEntityAttr('xin_customerid');
        //item.oppid = '{F91D07CC-6AEA-E511-93F3-00155D3C1F05}';
        if(!item.oppid)
        {
            reject({message : "请选择会员"});
            return;
        }
        item.customerid = item.oppid;
        const obj = { request : item };
        if(!item.isconversion === false) {
            if(item.code != 0) {
                item.code = 0;
                request.post('AccMgr/OpportunityService.svc/CreateMemberFollowTask',{request: item}).then(response => {
                        const { returnValue, message } = response.d || response;
                        if(returnValue) {
                            const followtaskid  = message;
                            common.alert('保存成功');
                            resolve( {"followtaskid": followtaskid});
                        }
                        else {
                            reject(response.d);
                        }
                        item.code=1;
                    },error => {
                        reject(error);item.code=1;
                });
            }    
            return;
        }
        if(item.code != 0) {
            item.code = 0;
            var custData = {};
            request.post('AccMgr/OpportunityService.svc/CreateOpportunity', obj).then(response => {
                  const { returnValue, message } = response.d || response;
                  if(returnValue) {
                    var { req  } = JSON.parse(message);
                    custData = req;
                    request.post('AccMgr/OpportunityService.svc/CreateMemberFollowTask',{request: item}).then(response => {
                            const { returnValue, message } = response.d || response;
                            if(returnValue) {
                                const followtaskid  = message;
                                common.alert('保存成功');
                                resolve(Object.assign(custData, {"followtaskid": followtaskid}));
                            }
                            else {
                                reject(response.d);
                            }
                            item.code=1;
                        },error => {
                            reject(error);item.code=1;
                    });
                   
                  }
                  else {
                    reject(response.d);item.code=1;
                        }
                  },error => {
                       reject(error);item.code=1;
            });
        }
    });
});

export const handleOnSalesFollowTaskCustomerChange = createAction(HANDLE_ON_SALES_FOLLOW_TASK_CUSTOMER_CHANGE, (customerid) => {
    return new Promise((resolve, reject) => {
        if(!customerid)
        {
            reject();
            return;
        }
        request.post('AccMgr/OpportunityService.svc/GetCustomerId',{customerid : customerid}).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                    let { req : { list } } = JSON.parse(message);
                    let customer = _.first(list);
                    customer.businesstype = customer.businesstype + '';
                    customer.cuestage = customer.cuestage + '';
                    customer.customertype = customer.customertype + '';
                    customer.accounttype = customer.accounttype + '';
                    resolve(customer);
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

    [HANDLE_ON_SALES_FOLLOW_TASK_CHANGE]: (state, action) => {
        state.item = Object.assign({},state.item, action.payload);
        state = Object.assign({}, state);
        return state;
    },
    [HANDLE_ON_SALES_FOLLOW_TASK_SAVE]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
             state.item = Object.assign({}, state.item, action.payload);
            return state = Object.assign({}, state);
        },
        throw(state, action) {
            alert(action.payload.message || ' 保存失败');
            return state;
        }
    },
    [HANDLE_ON_SALES_FOLLOW_TASK_LOAD]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
            state.LargeArea = action.payload.LargeArea;
            //state.item = Object.assign({}, state.item, action.payload);
            return state = Object.assign({}, state);
        },
        throw(state, action) {
           // alert(action.payload.message || ' 保存失败');
            return state;
        }
    },
    [HANDLE_ON_SALES_FOLLOW_TASK_CUSTOMER_CHANGE]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
            state.item = Object.assign({}, state.item, action.payload);
            return state = Object.assign({}, state);
        },
        throw(state, action) {
           // alert(action.payload.message || ' 保存失败');
            return state;
        }
    },

}, {});
