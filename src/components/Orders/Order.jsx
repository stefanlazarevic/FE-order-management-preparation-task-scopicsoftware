import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Checkbox, Glyphicon } from 'react-bootstrap';

import './Order.css';

const Order = props => {
    return (
        <tr>
            <td><Checkbox onChange={ (evt) => props.onCheckboxClick(evt.target.checked) } checked={ props.order.isSelected }></Checkbox></td>
            <td className="link" onClick={ props.onOrderClick }>{ props.order.id }</td>
            <td>{ props.order.date.format('MM-DD-YYYY') }</td>
            <td className="text-right">{ (props.order.price + props.order.price * 0.15).toFixed(2) }</td>
            <td className="text-right">
                <ButtonGroup>
                    <Button onClick={ () => props.onLockClick(!props.order.isLocked) }><Glyphicon glyph={ props.order.isLocked ? 'eye-open' : 'eye-close' }/></Button>
                    {
                        props.order.isLocked ? null : <Button onClick={ props.onDeleteButtonClick }>
                            <Glyphicon glyph="trash"/>
                        </Button>
                    }
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default Order;
