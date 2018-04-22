import React from 'react';
import PropTypes from 'prop-types';

import './Items.css';

import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import Item from './Item.jsx';

const Items = props => {
    return (
        <div>
            <SectionHeader headingType={4}
                title={ 'Items' }
                includeActionButton={ true }
                actionButtonText={ 'New Item' }
                onActionButtonClick={ props.onNewItemButtonClick } />
            <table className="table">
                <thead>
                    <tr className="tr--gray">
                        <th colSpan={5}>Records: { props.items.length }</th>
                    </tr>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th className="text-right">Extended Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr className="tr--gray">
                        <th colSpan={5}></th>
                    </tr>
                </tfoot>
                <tbody>
                    {
                        props.items.length ?
                            props.items.map((item, index) => {
                                return (
                                    <Item key={ index }
                                        index={ index }
                                        product={ item.product }
                                        quantity={ item.quantity }
                                        price={ item.price }
                                        onDelete={ (evt) => props.onTrashButtonClick(index) }
                                        onChange={ props.onItemInputChange }/>
                                );
                            }) :
                        <tr>
                            <td colSpan={5}>
                                <h4>No items.</h4>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

Items.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        product: PropTypes.string.isRequired,
        // quantity: PropTypes.number.isRequired,
        // price: PropTypes.number.isRequired,
    })),
};

export default Items;
