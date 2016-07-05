import { createAction, handleActions } from '../reduxActionsSequence';


const HANDLER_ON_OPTION_LOAD = 'HANDLER_ON_OPTION_LOAD';
export const handlerOnOptionLoad = createAction(HANDLER_ON_OPTION_LOAD, query => {
   return query;
});

export default handleActions({

    [HANDLER_ON_OPTION_LOAD]: (state, action) =>{
      return state;
    }

}, {});