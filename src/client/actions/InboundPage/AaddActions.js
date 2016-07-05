import { createAction, handleActions } from '../reduxActionsSequence';

const ON_SAVE = 'ON_SAVE';
const ON_SAVE1 = 'ON_SAVE1';
export const onSave = createAction(ON_SAVE, () => {
    return {};
});
export const onSave1 = createAction(ON_SAVE1, () => {
    return {};
});

export default handleActions({

    [ON_SAVE]: (state, action) => {
        state = Object.assign({}, state, {
            result: action.payload
        });
        return state;
    }

}, {});
