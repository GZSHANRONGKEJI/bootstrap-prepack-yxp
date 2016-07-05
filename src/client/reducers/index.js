import membersInfoChangeTabReducer from '../actions/InboundPage/MembersInfoChangeTabActions.js';
import aaddReducer from '../actions/InboundPage/AaddActions.js';
import salesFollowTaskTabReducer from '../actions/InboundPage/SalesFollowTaskTabActions.js';
import inboundProblemFeedbackTabReducer from '../actions/InboundPage/InboundProblemFeedbackTabActions.js';
import visitPlanTabReducer from '../actions/InboundPage/VisitPlanTabActions.js';
import inboundTabsReducer from '../actions/InboundPage/InboundTabsActions.js';
import callRecordsReducer from '../actions/InboundPage/CallRecordsActions.js';
import questionHistoryReducer from '../actions/InboundPage/QuestionHistoryActions.js';
import customerVipReducer from '../actions/InboundPage/CustomerVipActions.js';
import problemRecordTabReducer from '../actions/InboundPage/ProblemRecordTabActions.js';
import customerOptReducer from '../actions/InboundPage/CustomerOptActions.js';
import OptionReducer from '../actions/InboundPage/OptionActions.js';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    MemberInfoTab: membersInfoChangeTabReducer,
    salesFollowTaskTab: salesFollowTaskTabReducer,
    inboundProblemFeedback: inboundProblemFeedbackTabReducer,
    VisitPlan: visitPlanTabReducer,
    inboundTabs: inboundTabsReducer,
    CallRecords: callRecordsReducer,
    QuestionHistory: questionHistoryReducer,
    CustomerVip: customerVipReducer,
    ProblemRecord: problemRecordTabReducer,
    Option: OptionReducer,
    inboundData: customerOptReducer
});
export default rootReducer;