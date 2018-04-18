import * as ordersActionTypes from '../actiontypes/orders';

export const createOrder = orderData => dispatch => {
        const newOrder = {
            id: orderData.id,
            date: orderData.date,
            price: orderData.price,
            isLocked: false,
            isSelected: false,
            items: orderData.items,
        };

        dispatch({
            type: ordersActionTypes.POST_ORDER,
            payload: newOrder,
        });
};

export const updateOrder = (orderData, index) => dispatch => {
    dispatch({
        type: ordersActionTypes.PATCH_ORDER,
        payload: orderData
    });
};
