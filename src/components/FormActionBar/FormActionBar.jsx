import React from 'react';
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

import './FormActionBar.css';

const FormActionBar = props => {
    return (
        <Row className="actionbar__row">
            {/* This inline style is just for practice purposes. */}
            <Col md={12}>
                <ButtonToolbar style={ { backgroundColor: '#eee', padding: '10px 0' } }>
                    <Button onClick={ props.onSaveButtonClick } bsStyle="primary">Save</Button>
                    <Button onClick={ props.onCancelButtonClick }>Cancel</Button>
                </ButtonToolbar>
            </Col>
        </Row>
    );
};

export default FormActionBar;
