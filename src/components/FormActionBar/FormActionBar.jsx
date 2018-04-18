import React from 'react';
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

const FormActionBar = (props) => {
    return (
        <Row style={ { marginBottom: 20 } }>
            <Col md={12} style={ { backgroundColor: '#eee', padding: '10px 15px' } }>
                <ButtonToolbar>
                    <Button onClick={ props.onSaveButtonClick } bsStyle="primary">Save</Button>
                    <Button onClick={ props.onCancelButtonClick }>Cancel</Button>
                </ButtonToolbar>
            </Col>
        </Row>
    );
};

export default FormActionBar;
