import { createAction, handleActions } from '../reduxActionsSequence';
import { request } from '../../api/serverApi.js';
import common from '../../common/common.js';
import EventEmitter from '../../common/eventemitter';
const HANDLER_ON_CUSTOMER_VIP_QUERY = 'HANDLER_ON_CUSTOMER_VIP_QUERY';
const HANDLER_ON_CUSTOMERVIP_CHANG = 'HANDLER_ON_CUSTOMERVIP_CHANG'
export const handlerOnCustomerVipQuery = createAction(HANDLER_ON_CUSTOMER_VIP_QUERY, query => {
    if(!query.pagesize) {
        query.pagesize = 10;
    }
    if(!query.currentpage) {
        query.currentpage = 1;
    }
    if(!query.phone) {
        query.phone = common.getTemp().phone;
    }
    return new Promise((resolve, reject) => {
        // if(!query.phone) {
        //      reject({"message":"缺少手机号码"});
        // }
        return request.post('AccMgr/OpportunityService.svc/GetCustomerList', {"request": query}).then( response => {
            const { d : resp } = response
            if(resp.returnValue) {
                const { req :{ list } } = JSON.parse(resp.message);
                resolve(list);
            }
            else {
                reject(resp);
            }
            
        },error => {
            reject(error);
        });
    });
});
export const handlerOnCustomerVipChange = createAction(HANDLER_ON_CUSTOMERVIP_CHANG, (name, value) => {
    return { [name]: value };
});
export default handleActions({

    [HANDLER_ON_CUSTOMER_VIP_QUERY]: {
        start(state, action) {
            state.query = Object.assign({},state.query, { state : -1});
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
            if(state.query.currentpage == 1) {
                state.itemData = [];
            }
            state.query = Object.assign({},state.query, { state : 0, currentpage : state.query.currentpage + 1 });
            state.itemData = state.itemData.concat(action.payload);
            state = Object.assign({}, state);
            common.emit('onOppRefreshEnvent', state.itemData);
            return state;
        },
        throw(state, action) {
            state.query = Object.assign({},state.query, { state : 0});
            state = Object.assign({}, state);
            return state;
        }
    },
    [HANDLER_ON_CUSTOMERVIP_CHANG]: (state, action) => {
        state.query = Object.assign({},state.query,action.payload);
        state = Object.assign({}, state);
        return state;   
    },

}, {});
