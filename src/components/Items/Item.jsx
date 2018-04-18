import React from 'react';
import PropTypes from 'prop-types';
import './Item.css';

import { FormControl, Button } from 'react-bootstrap';

const Item = props => {

    const posibleItems = [
        'Book',
        'Pencil',
        'Scissors'
    ];

    return (
        <tr>
            <td>
            <FormControl componentClass="select" placeholder="select" defaultValue={ props.product } onChange={ (evt) => props.onChange(evt, 'product', props.index) }>
                <option defaultValue="select">select</option>
                { posibleItems.map((item, index) => {
                    return <option key={ index } value={ item } selected={ item === props.product }>{ item }</option>
                }) }
            </FormControl>
            </td>
            <td>
                <FormControl  value={ props.quantity } onChange={ (evt) => props.onChange(evt, 'quantity', props.index) }/>
            </td>
            <td>
                <FormControl  value={ props.price } onChange={ (evt) => props.onChange(evt, 'price', props.index) }/>
            </td>
            <td>{ props.quantity * props.price }</td>
            <td><span className="button__trash" onClick={ props.onDelete }>&#128465;</span></td>
        </tr>
    );
};

Item.propTypes = {
    product: PropTypes.string.isRequired,
    // quantity: PropTypes.string.isRequired,
    // price: PropTypes.string.isRequired,
};

export default Item;
