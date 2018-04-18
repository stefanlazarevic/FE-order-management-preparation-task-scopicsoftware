import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import OrdersReducer from '../reducers/orders';
import moment from 'moment';

const initialOrderState = {
    orders: {
        'ORD-0418-001' : {
            id: 'ORD-0418-001',
            date: moment('2018-04-16'), // Date in miliseconds.
            price: 805,
            isLocked: false,
            isSelected: false,
            items: [
                {
                    product: 'Book',
                    quantity: 5,
                    price: 100,
                },
                {
                    product: 'Pencil',
                    quantity: 4,
                    price: 50,
                },
            ],
        },
        'ORD-0418-002' : {
            id: 'ORD-0418-002',
            date: moment('2018-04-16'), // Date in miliseconds.
            price: 103.5,
            isLocked: false,
            isSelected: false,
            items: [
                {
                    product: 'Book',
                    quantity: 6,
                    price: 15,
                },
            ],
        },
    },
};

const customMiddlewares = [thunk];

const reduxDevToolsMiddleware = window.devToolsExtension && window.devToolsExtension();

const store = createStore(
    OrdersReducer,
    initialOrderState,
    compose(
        applyMiddleware(...customMiddlewares),
        reduxDevToolsMiddleware
    ),
);

export default store;
