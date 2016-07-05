import { createAction, handleActions } from '../reduxActionsSequence';
import common from '../../common/common.js';
import { request } from '../../api/serverApi.js';
import moment from 'moment';
const HANDLER_ON_QUESTION_HISTORY_QEURY = 'HANDLER_ON_QUESTION_HISTORY_QEURY';
const HANDLER_ON_QUESTION_HISTORY_ADDITIONAL = 'HANDLER_ON_QUESTION_HISTORY_ADDITIONAL';
const HANDLER_ON_QUESTION_HISTORY_OPEN = 'HANDLER_ON_QUESTION_HISTORY_OPEN';
const HANDLER_ON_QUESTION_HISTORY_QEURY_CHANGE = 'HANDLER_ON_QUESTION_HISTORY_QEURY_CHANGE';

export const handlerOnQuestionHistoryQeury = createAction(HANDLER_ON_QUESTION_HISTORY_QEURY, query => {
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
        //     reject({"message":"缺少手机号码"});
        //     return;
        // }   
        var currquery = query;
        request.post('AccMgr/OpportunityService.svc/GetQuestionHistoryList', {"request": query}).then( response => {
            const { d : resp } = response
            if(resp.returnValue) {
                const { req :{  list } } = JSON.parse(resp.message);
                
                resolve({ list:list,currquery:currquery });
            }
            reject(resp);
        },error => {
            reject(error);
        });
    });

});
export const handlerOnQuestionHistoryAdditional = createAction(HANDLER_ON_QUESTION_HISTORY_ADDITIONAL, (item, problemdescription) =>{
    var obj = {};

    obj.questionid = item.questionid;
    obj.ownerid = common.getTemp().ownerid;
    obj.phonenumber = common.getTemp().phone;
    obj.phonecallid =common.getTemp().phonecallid;
    obj.state = 1;
    obj.problemdescription = problemdescription;
    if(item.code != 0) {

        item.code = 0;
        return new Promise((resolve, reject) => {
            request.post('AccMgr/OpportunityService.svc/CreateCallTask', {"request": obj}).then( response => {
                const { d : resp } = response
                if(resp.returnValue) {
                    const  { problemdescription : content } = JSON.parse(resp.message);
                    //item.problemdescription1 = content;
                    item.problemdescription = content;
                    item.open = false;
                    common.alert('追加成功');
                    resolve(item);
                }
                reject(resp);
                setTimeout(()=>{
                    item.code = 1;
                },100)
                

            },error => {
                reject(error);
                item.code = 1;
            });
        });
    } 
})
export const handlerOnQuestionHistoryOpen = createAction(HANDLER_ON_QUESTION_HISTORY_OPEN, item =>{
     if(['2'].indexOf(item.Processingmode+'') > -1 || ['8'].indexOf(item.questionsolvestatus+'') > -1) {
        var q={};
        q.Id=item.questionid;
        q.Theme = item.questionname;
        q.QuestionType2=item.QuestionType2;
        q.Processingmode=item.Processingmode  + "";
        q.LargeArea=item.LargeArea;
        q.members=item.members;
        q.usephone=item.usephone;
        q.CustomerCategory=item.CustomerCategory + "";
        q.ProblemDescription=item.problemdescription;
        q.Feedback=item.Feedback;
        q.membername =item.membersName;
        q.cuestage =item.cuestage;
        q.subject =item.subject;
        q.type=1;
        common.emit('onEditProblemRecord', q); //问题记录编辑
        return false;
     }
     //自主解决任务情况都能追加
    if([0].indexOf(item.Processingmode) == -1) {
         if([3,4,5,6].indexOf(item.questionsolvestatus) > -1) {
            common.alert('此问题已解决,不允许追加,请新建问题。');
            return false;
         }
    }
     return item.open = !item.open;
})
export const handlerOnQuestionHistoryQueryChange = createAction(HANDLER_ON_QUESTION_HISTORY_QEURY_CHANGE, (name, value) =>{
     return { [name]: value };
})
export default handleActions({

    [HANDLER_ON_QUESTION_HISTORY_QEURY]: {
        start(state, action) {
            return state;
        },
        next(state, action) {
            if(action.payload.currquery.currentpage == 1) {
                state.itemData = [];
            }
            state.query = Object.assign({},state.query, { state : 0, currentpage : action.payload.currquery.currentpage + 1});
            
            state.itemData = state.itemData.concat(common.momentItemFormat(action.payload.list, "createdon"));
            //state.itemData = action.payload;
            state = Object.assign({}, state);
            return state;
        },
        throw(state, action) {

            return state;
        }
    },
    [HANDLER_ON_QUESTION_HISTORY_ADDITIONAL]: (state, action) => {
        
        state.itemData = [].concat(state.itemData);
        state = Object.assign({}, state);

        return state; 
    },
    [HANDLER_ON_QUESTION_HISTORY_OPEN]: (state, action) => {
        state.itemData = [].concat(state.itemData); 
        state = Object.assign({}, state);
        return state; 
    },
    [HANDLER_ON_QUESTION_HISTORY_QEURY_CHANGE]: (state, action) => {
        state.query = Object.assign({},state.query, action.payload);
        state = Object.assign({}, state);
        return state;   
    }

}, {});
