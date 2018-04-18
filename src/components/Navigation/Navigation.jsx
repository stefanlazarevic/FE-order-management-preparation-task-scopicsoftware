import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import Panel from '../Panel/Panel.jsx';

const Navigation = (props) => {
    return (
        <BrowserRouter>
            <Grid>
                <Route path="/" component={ Panel }/>
            </Grid>
        </BrowserRouter>
    );
};

export default Navigation;
