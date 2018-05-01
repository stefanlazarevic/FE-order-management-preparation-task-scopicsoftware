import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import OrdersReducer from '../reducers/orders';

const orders = {};

const initialState = { orders };

const customMiddlewares = [thunk];

const reduxDevToolsMiddleware = window.devToolsExtension && window.devToolsExtension();

const store = createStore(
    OrdersReducer,
    initialState,
    compose(
        applyMiddleware(...customMiddlewares),
        reduxDevToolsMiddleware
    ),
);

export default store;
