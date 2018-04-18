import * as ordersActionTypes from '../actiontypes/orders';

export const createOrder = orderData => dispatch => {
        dispatch({
            type: ordersActionTypes.POST_ORDER,
            payload: orderData,
        });
};

export const updateLockedStatus = (id, value) => dispatch =>{
    dispatch({
        type: ordersActionTypes.UPDATE_LOCKED_STATUS,
        payload: {
            id,
            isLocked: value,
        },
    });
}

export const updateCheckedStatus = (id, value) => dispatch =>{
    dispatch({
        type: ordersActionTypes.UPDATE_SELECTED_STATUS,
        payload: {
            id,
            isSelected: value,
        },
    });
}
