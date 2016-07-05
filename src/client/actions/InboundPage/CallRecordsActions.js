import { createAction, handleActions } from '../reduxActionsSequence';
import common from '../../common/common.js';
import { request } from '../../api/serverApi.js';
const HANDLER_ON_CALL_RECORD_QUERY = 'HANDLER_ON_CALL_RECORD_QUERY';
const HANDLER_ON_CALL_RECORDS_CHANGE = 'HANDLER_ON_CALL_RECORDS_CHANGE';
export const handlerOnCallRecordQuery = createAction(HANDLER_ON_CALL_RECORD_QUERY, query => {
    if(!query.pagesize) {
        query.pagesize = 10;
    }
    if(!query.currentpage) {
        query.currentpage = 1;
    }
    if(!query.phonenumber) {
        query.phonenumber = common.getTemp().phone;
    }
    return new Promise((resolve, reject) => {
        // if(!query.phonenumber) {
        //   reject({"message":"缺少手机号码"});
        //   return;
        // }
        request.post('AccMgr/OpportunityService.svc/GetCallList', {"request": query}).then( response => {
            const { d : resp } = response
            if(resp.returnValue) {
                const { req :{ list } } = JSON.parse(resp.message);
                
                resolve(list);
            }
            reject(resp);
            

        },error => {
            reject(error);
        });
    });
});
export const handlerOnCallRecordsChange = createAction(HANDLER_ON_CALL_RECORDS_CHANGE, (name, value) => {
    return { [name]: value };
});
export default handleActions({

    [HANDLER_ON_CALL_RECORD_QUERY]: {
        start(state, action) {
            return state;
        },
        next(state, action) {
            if(state.query.currentpage == 1) {
                state.itemData = [];
            }
            state.query = Object.assign({},state.query, { currentpage : state.query.currentpage + 1});

            state.itemData = state.itemData.concat(common.momentItemFormat(action.payload, "calltime"));
            //state.itemData = action.payload;
            state = Object.assign({}, state);
            return state;
        },
        throw(state, action) {
            return state;
        }
    },
    [HANDLER_ON_CALL_RECORDS_CHANGE]: (state, action) => {
        state.query = Object.assign({},state.query, action.payload);
        state = Object.assign({}, state);
        return state;   
    },


}, {});
