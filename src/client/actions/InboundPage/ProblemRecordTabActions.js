import { createAction, handleActions } from '../reduxActionsSequence';
import { request } from '../../api/serverApi.js';
import common from '../../common/common.js';
const HANDLER_ON_RECORD_EDIT_ITEM = 'HANDLER_ON_RECORD_EDIT_ITEM';
const HANDLER_ON_RECORD_DELETE_ITEM = 'HANDLER_ON_RECORD_DELETE_ITEM';
const HANDLER_ON_RECORD_SUBMIT = 'HANDLER_ON_RECORD_SUBMIT';
const HANDLER_ON_RECORD_SAVE = 'HANDLER_ON_RECORD_SAVE';
const HANDLER_ON_RECORD_CHANG = 'HANDLER_ON_RECORD_CHANG';
const HANDLER_ON_RECORD_NEW = 'HANDLER_ON_RECORD_NEW';
const HANDLER_ON_RECORD_LOAD = 'HANDLER_ON_RECORD_LOAD';
const HANDLER_ON_RECORD_OPP_REFRESH = 'HANDLER_ON_RECORD_OPP_REFRESH';
export const handlerOnRecordEditItem = createAction(HANDLER_ON_RECORD_EDIT_ITEM, item => {
    //return Object.assign({},item);
    return item;
});
export const handlerOnRecordDeleteItem = createAction(HANDLER_ON_RECORD_DELETE_ITEM, item => {
     return new Promise((resolve, reject) => {
        request.post('AccMgr/OpportunityService.svc/DeleteQuestion',{request: item} ).then(response => {
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
export const handlerOnRecordSubmit = createAction(HANDLER_ON_RECORD_SUBMIT, Record => {
    return new Promise((resolve, reject) => {
        Record.ownerid = common.getTemp().ownerid;
        Record.phonenumber = common.getTemp().phone;
        Record.phonecallid = common.getTemp().phonecallid;
        if(!Record.members) {
            Record.usephone = common.getTemp().phone;
            Record.members = common.getCrmEntityAttr('xin_customerid');
            Record.accountid = common.getCrmEntityAttr('xin_accountid');
            if(!Record.members) {
                reject({message:"请选择会员"});
                return;
            }
        }
        var subimtRecord = Object.assign({}, Record, { State : 2});
        if(Record.code != 0)  {
            Record.code = 0;
            request.post('AccMgr/OpportunityService.svc/CreateQuestion',{request: subimtRecord} ).then(response => {
                    const { returnValue, message } = response.d || response;
                    if(returnValue) {
                        const { questionid } = JSON.parse(message);
                        Record.State = 2;
                        common.alert('提交成功');
                        resolve(Object.assign( {"Id": questionid, State : 2, No: Record.No} ));
                    }
                    else {
                        reject(response.d);
                    }
                    Record.code = 1;
                },error => {
                    reject(error);
                    Record.code = 1;

            });
        }
    });
});
export const handlerOnRecordLoad = createAction(HANDLER_ON_RECORD_LOAD, item => {
    return new Promise((resolve, reject) => {
        request.post('AccMgr/OpportunityService.svc/GetBusinessUnit').then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                    const { req : { businessunitlist } } = JSON.parse(message);
                    resolve(Object.assign(businessunitlist));
                }
                else {
                    reject(response.d);
                }
            },error => {
                reject(error);

        });
    });
});
export const handlerOnRecordSave = createAction(HANDLER_ON_RECORD_SAVE, (item, Record) => {
    return new Promise((resolve, reject) => {
        Record.phonecallid = common.getTemp().phonecallid;
        Record.phonenumber = common.getTemp().phone;
        Record.ownerid = common.getTemp().ownerid;
        if(!Record.members) {
            Record.usephone = common.getTemp().phone;
            Record.members = common.getCrmEntityAttr('xin_customerid');
            Record.accountid = common.getCrmEntityAttr('xin_accountid');
            if(!Record.members) {
                reject({message:"请选择会员"});
                return;
            }
        } 
        if(Record.code != 0)  {
            Record.code = 0;
            request.post('AccMgr/OpportunityService.svc/CreateQuestion',{request: Record} ).then(response => {
                    const { returnValue, message } = response.d || response;
                    if(returnValue) {
                        const { questionid } = JSON.parse(message);
                        common.alert('保存成功');
                        resolve(Object.assign( {"Id": questionid, State : 1} ));
                    }
                    else {
                        reject(response.d);
                    }
                    Record.code = 1;
                },error => {
                    reject(error);
                    Record.code = 1;
            });
        }
    });
});
export const handlerOnRecordChange = createAction(HANDLER_ON_RECORD_CHANG, (name, value) => {
    return { [name]: value };
});
export const handlerOnRecordNew= createAction(HANDLER_ON_RECORD_NEW, (item) => {
    return item;
});
export const handleOnRecordOppRefresh= createAction(HANDLER_ON_RECORD_OPP_REFRESH, (DataList) => {
    return DataList;
});
export default handleActions({

    [HANDLER_ON_RECORD_EDIT_ITEM]: (state, action) => {

        const record =  Object.assign({},action.payload);
        if(!record.No && record.Id) {
           var rd = _.find(state.list, {"Id": record.Id});
            if(rd) {
               record.No = rd.No;
            }

        }
        var  opp = _.find(state.OppList, {value: record.members});
        if(!opp) {

            if(record.membername)
                state.OppList.push({ text: record.membername, city:record.LargeArea, name: record.membername, accountid: record.accountid, contactstel:record.usephone , value: record.members,cuestage:record.cuestage,subject:record.subject })
        }
        state = Object.assign({}, state , {  Record : record  });

        return state;   
    },
    [HANDLER_ON_RECORD_DELETE_ITEM]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
            var item = _.find(state.list,{"No" : action.payload.No})
            if(item)
            {
                state.list= _.without(state.list,item);
                if( state.Record.No === action.payload.No ) {
                    state.Record =  Object.assign({}, state.RecordEmpty);
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
    [HANDLER_ON_RECORD_CHANG]: (state, action) => {
        if(action.payload.members != undefined) {
      
            let accountid = ''
            if(action.payload.members) {
                const opp = _.find(state.OppList, { value : action.payload.members });
                if(opp) {
                
                    accountid = opp.accountid;

                    action.payload.LargeArea = (opp.city || '').toLowerCase();
                    action.payload.membersname = opp.name;
                    action.payload.cuestage = opp.cuestage;
                    action.payload.subject = opp.subject;
                }
            }

            action.payload.accountid = accountid;
        }
        state.Record = Object.assign({}, state.Record, action.payload);
        state = Object.assign({}, state);

        return state;   
    },
    [HANDLER_ON_RECORD_NEW]: (state, action) => {
        state.Record = Object.assign({}, action.payload);
        state = Object.assign({}, state);

        return state;   
    },
    [HANDLER_ON_RECORD_SUBMIT]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {

           common.emit('handlerOnQuestionHistoryTopOne');
            if(!action.payload.No) {
                var Record = Object.assign(state.Record, action.payload );
                let RecordMAX  = _.max(state.list,(item) => { return item.No });
                const max = RecordMAX === -Infinity ? 1 : RecordMAX.No * 1 + 1;
                Record.No = max;  
                state.list.push(Record);
                var currRecord = _.find(state.list, {"No": Record.No});
                currRecord =  Object.assign(currRecord, Record);
            }
            else if(action.payload.No === state.Record.No) {
                    state.Record = Object.assign(state.Record, action.payload);
            }

            state.list = state.list.map((item)=>{return item});
            return state = Object.assign({}, state);
        },
        throw(state, action) {
            alert(action.payload.message || '提交失败');
            return state;
        }
    },
    [HANDLER_ON_RECORD_SAVE]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
            common.emit('handlerOnQuestionHistoryTopOne');
            var Record = Object.assign(state.Record, action.payload );
           
            if(!Record.No) {
                let RecordMAX  = _.max(state.list,(item) => { return item.No });
                const max = RecordMAX === -Infinity ? 1 : RecordMAX.No * 1 + 1;
                Record.No = max;  
                state.list.push(Record);
            }
            var currRecord = _.find(state.list, {"No": Record.No});

            currRecord =  Object.assign(currRecord, Record);
            state.list = state.list.map((item)=>{return item});
            return state = Object.assign({}, state);
        },
        throw(state, action) {
            alert(action.payload.message || '保存失败');
            return state;
        }
    },
    [HANDLER_ON_RECORD_LOAD]: {
        start(state, action) {
            state = Object.assign({}, state);
            return state;
        },
        next(state, action) {
            state.LargeArea = action.payload;
            state = Object.assign({}, state);
            return state;
        },
        throw(state, action) {
            return state;
        }
    },
    [HANDLER_ON_RECORD_OPP_REFRESH]: (state, action) => {
        
        state.OppList = action.payload.map(item => { return { text: item.subject+ '-'+ item.membername, city:item.city, name:item.subject+ '-'+ item.membername, accountid: item.accountid, contactstel:item.contactstel , value: item.customerid,cuestage:item.cuestage,subject: item.subject } });
        state = Object.assign({}, state);
        return state;
    },

}, {});
