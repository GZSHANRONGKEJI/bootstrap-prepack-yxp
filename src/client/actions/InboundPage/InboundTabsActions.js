import { createAction, handleActions } from '../reduxActionsSequence';

const HANDLER_ON_TABS_SELECT = 'HANDLER_ON_TABS_SELECT';

export const handlerOnTabsSelect = createAction(HANDLER_ON_TABS_SELECT, e => {
    return {};
});

export default handleActions({

    [HANDLER_ON_TABS_SELECT]: (state, action) => {
        state = Object.assign({}, state, {
            result: action.payload
        });
        return state;
    }

}, {});
