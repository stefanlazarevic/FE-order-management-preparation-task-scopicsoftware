import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Checkbox, Glyphicon } from 'react-bootstrap';

import './Order.css';

const Order = props => (
    <tr className="order__tr">
        <td>
            <Checkbox onChange={ (evt) => props.onCheckboxClick(evt.target.checked) }
                        checked={ props.order.isSelected } />
        </td>
        <td className="link" onClick={ props.onOrderClick }>
            <span>{ props.order.id }</span>
        </td>
        <td>
            <span>{ props.order.date.format('MM-DD-YYYY') }</span>
        </td>
        <td className="text-right">
            <span>{ (props.order.price + props.order.price * 0.15).toFixed(2) }</span>
        </td>
        <td className="text-right">
            <ButtonGroup>
                <Button onClick={ () => props.onLockClick(!props.order.isLocked) }>
                    <Glyphicon glyph={ `lock ${props.order.isLocked ? 'text-danger' : ''}` }/>
                </Button>
                {
                    props.order.isLocked ?
                        null :
                        <Button onClick={ props.onDeleteButtonClick }>
                            <Glyphicon glyph="trash"/>
                        </Button>
                }
            </ButtonGroup>
        </td>
    </tr>
);

Order.propTypes = {
    order: PropTypes.object.isRequired,
    onOrderClick: PropTypes.func.isRequired,
    onLockClick: PropTypes.func.isRequired,
    onDeleteButtonClick: PropTypes.func.isRequired,
};

export default Order;
