import { createAction, handleActions } from '../reduxActionsSequence';
import { request } from '../../api/serverApi.js';
import common from '../../common/common.js';
const HANDLER_ON_VISIT_PLAN_NEW = 'HANDLER_ON_VISIT_PLAN_NEW';
const HANDLER_ON_VISIT_PLAN_DELETE_ITEM = 'HANDLER_ON_VISIT_PLAN_DELETE_ITEM';
const HANDLER_ON_VISIT_PLAN_SAVE = 'HANDLER_ON_VISIT_PLAN_SAVE';
const HANDLER_ON_VISIT_PLAN_EDIT = 'HANDLER_ON_VISIT_PLAN_EDIT';
const HANDLER_ON_VISIT_PLAN_CHANGE = 'HANDLER_ON_VISIT_PLAN_CHANGE';

export const handlerOnVisitPlanNew = createAction(HANDLER_ON_VISIT_PLAN_NEW, (item) => {
    return Object.assign({}, item);
});
export const handlerOnVisitPlanDeleteItem = createAction(HANDLER_ON_VISIT_PLAN_DELETE_ITEM, (item) => {
     return new Promise((resolve, reject) => {
        request.post('AccMgr/OpportunityService.svc/DeleteWorkOrder',{request: item} ).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                    resolve(item);
                }
                else {
                    reject(item);
                }
            },error => {
                reject(error);

        });
    });
});
export const handlerOnVisitPlanSave = createAction(HANDLER_ON_VISIT_PLAN_SAVE, (item) => {
    return new Promise((resolve, reject) => {
        item.obtype = '905290002';
        item.directioncode = !0;
        if(!common.getTemp().lastphonecallid) {
            common.getTemp().lastphonecallid = common.getTemp().phonecallid 
        }
        item.lastphonecallid =  common.getTemp().lastphonecallid;
        item.ownerid = common.getTemp().ownerid;
        if(!item.phonenumber) {
            item.phonenumber = common.getTemp().phone;

        }
        item.fromtype = 2;
        if(common.getTemp().entityName === 'phonecall') {
            var obtype = common.getCrmEntityAttr('xin_obtype');
            //线索跟进外呼
            if(obtype == 905290005){
                item.fromtype = 5;
            }
            //会员跟进回访
            if(obtype == 905290000){
                item.fromtype = 7;
            }
            //问题反馈回访
            if(obtype == 905290001){
                item.fromtype = 9;
            }
            //工单外呼回访
            if(obtype == 905290006){
                item.fromtype = 11;
            }
            //手动外呼回访
            if(obtype == 905290004){
                item.fromtype = 11;
            }
        }
        //oppid
        if(item.code != 0 ) {
            item.code = 0;
            request.post('AccMgr/OpportunityService.svc/CreateWorkOrder',{request: item} ).then(response => {
                    const { returnValue, message } = response.d || response;
                    if(returnValue) {
                        const questionid  = message;
                        common.alert('保存成功');
                        resolve(Object.assign( {"phonecallid": questionid, State : 1} ));
                    }
                    else {
                        reject(response.d);
                    }
                    item.code =1;
                },error => {
                    reject(error);item.code =1;

            });
        }    
    });
});
export const handlerOnVisitPlanEdit = createAction(HANDLER_ON_VISIT_PLAN_EDIT, (item) => {
        return item;
});
export const handlerOnVisitPlanChange = createAction(HANDLER_ON_VISIT_PLAN_CHANGE, (name, value) => {
    return { [name]: value };
});

export default handleActions({

    [HANDLER_ON_VISIT_PLAN_NEW]: (state, action) => {
        state.query = Object.assign({}, action.payload);
        state = Object.assign({}, state);

        return state; 
    },
    [HANDLER_ON_VISIT_PLAN_DELETE_ITEM]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
            var item = _.find(state.itemData, {"No" : action.payload.No})
            if(item)
            {
                state.itemData= _.without(state.itemData, item);
                if( state.query.No === action.payload.No ) {
                    state.query =  Object.assign({}, state.queryEmpty);
                }
                state = Object.assign({}, state);
            }
            return state;  
        },
        throw(state, action) {
            alert('删除失败');
            return state;
        }
    },
    [HANDLER_ON_VISIT_PLAN_SAVE]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
            var query = Object.assign(state.query, action.payload );
           
            if(!query.No) {
                let RecordMAX  = _.max(state.itemData,(item) => { return item.No });
                const max = RecordMAX === -Infinity ? 1 : RecordMAX.No * 1 + 1;
                query.No = max;  
                state.itemData.push(query);
            }
            var currquery = _.find(state.itemData, {"No": query.No});

            currquery =  Object.assign(currquery, query);
            state.itemData = state.itemData.map((item)=>{return item});
            return state = Object.assign({}, state);
        },
        throw(state, action) {
            alert('保存失败');
            return state;
        }
    },
    [HANDLER_ON_VISIT_PLAN_EDIT]: (state, action) => {
        const query =  Object.assign({}, action.payload);
        state = Object.assign({}, state, {  query : query  });
        return state;  
    },
    [HANDLER_ON_VISIT_PLAN_CHANGE]: (state, action) => {
        state.query = Object.assign({},state.query, action.payload);
        state = Object.assign({}, state);

        return state;   
    }

}, {});
