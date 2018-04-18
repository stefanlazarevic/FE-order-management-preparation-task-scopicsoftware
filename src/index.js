import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux-store/store';

import Navigation from './components/Navigation/Navigation.jsx';

render(
    <Provider store={ store }>
        <Navigation />
    </Provider>,
    document.getElementById('root')
);
