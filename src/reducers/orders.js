import * as ordersActionTypes from '../actiontypes/orders';

export default (state = {}, action) => {
    switch (action.type) {
        case ordersActionTypes.POST_ORDER:
            const newState = Object.assign({}, state);
            newState.orders[action.payload.id] = action.payload;
            return newState;
        default: return state;
    }
};
