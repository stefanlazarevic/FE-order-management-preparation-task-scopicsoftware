import * as ordersActionTypes from '../actiontypes/orders';

export default (state = {}, action) => {
    const newOrders = Object.assign({}, state.orders);
    switch (action.type) {
        case ordersActionTypes.POST_ORDER: {
            return {
                orders: {
                    ...newOrders,
                    [action.payload.id]: {
                        ...action.payload
                    }
                }
            };
        }
        case ordersActionTypes.UPDATE_SELECTED_STATUS: {
            const order = Object.assign({}, state.orders[action.payload.id]);
            order.isSelected = action.payload.isSelected;
            return {
                orders: {
                    ...newOrders,
                    [action.payload.id]: {
                        ...order,
                    },
                }
            }
        }
        case ordersActionTypes.UPDATE_LOCKED_STATUS: {
            const order = Object.assign({}, state.orders[action.payload.id]);
            order.isLocked = action.payload.isLocked;
            return {
                orders: {
                    ...newOrders,
                    [action.payload.id]: {
                        ...order,
                    },
                }
            }
        }
        default: return state;
    };
};
