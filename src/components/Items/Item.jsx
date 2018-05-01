import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Button, Glyphicon } from 'react-bootstrap';

import './style/Item.css';

import ItemTotal from './ItemTotal.jsx';

const posibleItems = [
    'ASUS GeForce 4 MX4000 GDDR',
    'Canon NPG-13 Toner 9500pages Black',
    'Canon Cartridge BC-11E 4-colour ink cartridge',
    'Dicota MultiStart 15.6" Briefcase Black'
];

class Item extends PureComponent {
    getValue = () => ({
        id: this.props.id,
        product: this.product.value,
        quantity: this.quantity.value,
        price: this.price.value,
    })

    onChange = evt => {
        this.props.onDataChange(this.getValue());
        this.itemTotal.updateTotal(this.quantity.value * this.price.value)
    };

    render() {
        const { props } = this;
        return (
            <tr>
                <td>
                    <FormControl componentClass="select"
                                 placeholder="select"
                                 defaultValue={ props.product }
                                 inputRef={select => (this.product = select ) }>
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
                    <FormControl type="number"
                                 defaultValue={ props.quantity || 0 }
                                 inputRef={input => (this.quantity = input ) }
                                 onChange={ this.onChange } />
                </td>
                <td>
                    <FormControl type="number"
                                 defaultValue={ props.price || 0 }
                                 inputRef={input => (this.price = input ) }
                                 onChange={ this.onChange }/>
                </td>
                <td className="text-right">
                    <ItemTotal onRef={ itemTotal => (this.itemTotal = itemTotal) }
                               total={ this.props.quantity * this.props.price } />
                </td>
                <td>
                    <Button onClick={ props.onDelete }>
                        <Glyphicon glyph="trash"/>
                    </Button>
                </td>
            </tr>
        );
    }
};

Item.propTypes = {
    product: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
};

export default Item;
