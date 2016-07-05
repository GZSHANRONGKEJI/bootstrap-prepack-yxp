import { createAction, handleActions } from '../reduxActionsSequence';
import common from '../../common/common.js';
import { request } from '../../api/serverApi.js';
const HANDLERS_ON_PROBLEM_FEEDBACK_SAVE = 'HANDLERS_ON_PROBLEM_FEEDBACK_SAVE';
const HANDLERS_ON_PROBLEM_FEEDBACK_LOAD = 'HANDLERS_ON_PROBLEM_FEEDBACK_LOAD';

const HANDLERS_ON_PROBLEM_FEEDBACK_CHANGE = 'HANDLERS_ON_PROBLEM_FEEDBACK_CHANGE';

export const handlersOnProblemFeedbackSave = createAction(HANDLERS_ON_PROBLEM_FEEDBACK_SAVE, item => {
    return new Promise((resolve, reject) => {
        let Obj = {};
        Obj.Id = item.questionid;
        Obj.Feedback1 = item.Feedback1;
        Obj.solvingstate = item.solvingstate;
        request.post('AccMgr/OpportunityService.svc/CreateQuestion',{request: Obj} ).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                    const { questionid } = JSON.parse(message);
                    common.alert('保存成功')
                    resolve(Object.assign( {"Id": questionid} ));
                }
                else {
                    reject(response.d);
                }
            },error => {
                reject(error);

        });
    });
});
export const handlersOnProblemFeedbackLoad = createAction(HANDLERS_ON_PROBLEM_FEEDBACK_LOAD, (questionid) => {
    return new Promise((resolve, reject) => {
        let Obj = {};
        Obj.questionid = questionid;
        Obj.pagesize = 1;
        Obj.currentpage = 1;
        request.post('AccMgr/OpportunityService.svc/GetQuestionHistoryList',{request: Obj} ).then(response => {
                const { returnValue, message } = response.d || response;
                if(returnValue) {
                    const { req: { list :  [ data ] } } = JSON.parse(message);

                    resolve(data);
                }
                else {
                    reject(response.d);
                }
            },error => {
                reject(error);

        });
    });
});
export const handlersOnProblemFeedbackChange = createAction(HANDLERS_ON_PROBLEM_FEEDBACK_CHANGE, (name, value) => {
    return { [name]: value };
});


export default handleActions({

    [HANDLERS_ON_PROBLEM_FEEDBACK_SAVE]: {
        start(state, action) {

            return state;
        },
        next(state, action) {

            return state;
        },
        throw(state, action) {
            alert(action.payload.message)
            return state;
        }
    },
     [HANDLERS_ON_PROBLEM_FEEDBACK_LOAD]: {
        start(state, action) {

            return state;
        },
        next(state, action) {

            state.item =  Object.assign({}, state.item, action.payload);
            state = Object.assign({}, state);
            return state;
        },
        throw(state, action) {
            alert(action.payload.message)
            return state;
        }
    },
    [HANDLERS_ON_PROBLEM_FEEDBACK_CHANGE]: (state, action) => {
        state.item = Object.assign({},state.item ,action.payload);
        state = Object.assign({}, state);
        return state;   
    },

}, {});
