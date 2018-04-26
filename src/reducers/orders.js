import * as ordersActionTypes from '../actiontypes/orders';
import moment from 'moment';

export default (state = {}, action) => {
    const newOrders = Object.assign({}, state.orders);
    switch (action.type) {
        case ordersActionTypes.FETCH_ORDERS: {
            const orders = JSON.parse(localStorage.getItem('RFE-orders')) || {};
            Object.keys(orders).forEach(id => {
                orders[id].date = moment(orders[id].date);
                orders[id].isSelected = false; // Unselect all orders on initial fetch from local storage.
            });
            return { orders };
        }
        case ordersActionTypes.POST_ORDER: {
            const orders = {
                ...newOrders,
                [action.payload.id]: {
                    ...action.payload
                }
            };

            localStorage.setItem('RFE-orders', JSON.stringify(orders));

            return { orders };
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
        case ordersActionTypes.DELETE_ORDER: {
            const toDeleteId = action.payload;
            const newOrders = Object.assign({}, state.orders);

            if (typeof toDeleteId === 'string' && toDeleteId !== 'selected') {
                const orders = {};
                Object.keys(newOrders).forEach(id => {
                    if (id !== toDeleteId) {
                        orders[id] = newOrders[id];
                    }
                });

                localStorage.setItem('RFE-orders', JSON.stringify(orders));

                return { orders }
            }

            if (typeof toDeleteId === 'string' && toDeleteId === 'selected') {
                const orders = {};
                Object.keys(newOrders).forEach(id => {
                    const order = newOrders[id];
                    if (!order.isSelected || order.isLocked) {
                        orders[id] = order;
                    }
                });

                localStorage.setItem('RFE-orders', JSON.stringify(orders));

                return { orders };
            }

            break;
        }

        default: return state;
    };
};
