import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Checkbox, Glyphicon } from 'react-bootstrap';

import './Order.css';

const Order = props => {
    return (
        <tr>
            <td><Checkbox onClick={ props.onCheckboxClick }></Checkbox></td>
            <td className="link" onClick={ props.onOrderClick }>{ props.order.id }</td>
            <td>{ props.order.date.format('MM-DD-YYYY') }</td>
            <td className="text-right">{ props.order.price.toFixed(2) }</td>
            <td className="text-right">
                <ButtonGroup>
                    <Button onClick={ props.onEyeButtonClick }><Glyphicon glyph="eye-open"/></Button>
                    <Button onClick={ props.onDeleteButtonClick }><Glyphicon glyph="trash"/></Button>
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default Order;
