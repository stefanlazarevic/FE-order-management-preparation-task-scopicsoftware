import React from 'react';
import PropTypes from 'prop-types';

import './Item.css';

import { FormControl, Button, Glyphicon } from 'react-bootstrap';

const Item = props => {

    const posibleItems = [
        'ASUS GeForce 4 MX4000 GDDR',
        'Canon NPG-13 Toner 9500pages Black',
        'Canon Cartridge BC-11E 4-colour ink cartridge',
        'Dicota MultiStart 15.6" Briefcase Black'
    ];

    return (
        <tr>
            <td>
                <FormControl componentClass="select"
                             placeholder="select"
                             value={ props.product }
                             onChange={ (evt) => props.onChange(evt, 'product', props.index) }>
                    <option defaultValue="select">select</option>
                    {
                        posibleItems.map(
                            (item, index) => (
                                <option key={ index } value={ item }>
                                    { item }
                                </option>
                            )
                        )
                    }
                </FormControl>
            </td>
            <td>
                <FormControl value={ props.quantity }
                             onChange={ (evt) => props.onChange(evt, 'quantity', props.index) } />
            </td>
            <td>
                <FormControl value={ props.price } onChange={ (evt) => props.onChange(evt, 'price', props.index) } />
            </td>
            <td className="text-right">
                <span>{ props.quantity * props.price }</span>
            </td>
            <td>
                <Button onClick={ props.onDelete }>
                    <Glyphicon glyph="trash"/>
                </Button>
            </td>
        </tr>
    );
};

Item.propTypes = {
    product: PropTypes.string.isRequired,
    // quantity: PropTypes.string.isRequired,
    // price: PropTypes.string.isRequired,
};

export default Item;
