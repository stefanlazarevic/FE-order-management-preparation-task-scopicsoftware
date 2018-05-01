import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Item from '../Item.jsx';

function generateUID() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

class TBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items || [],
        };
    }

    componentDidMount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(this)
        }
    }

    componentWillUnmount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(undefined)
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    addItem = () => {
        const item = {
            id: generateUID(),
            product: '',
            quantity: 0,
            price: 0,
        };

        this.setState(state => {
            const { items } = state;
            items.unshift(item);

            this.props.onItemAmountChange(items.length);
            this.props.onItemUpdate(items);

            return { items };
        });

        return item;
    }

    removeItem = index => {
        this.setState(state => {
            const items = [
                ...state.items.slice(0, index),
                ...state.items.slice(index + 1),
            ];

            this.props.onItemAmountChange(items.length);
            this.props.onItemUpdate(items);

            return { items };
        });
    }

    getItems = () => this.state.items;

    updateItem = (index, item) => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.setState(state => {
                const items = [
                    ...state.items.slice(0, index),
                    item,
                    ...state.items.slice(index + 1),
                ];

                this.props.onItemUpdate(items);

                return { items };
            });
        }, 500);

    }

    renderItemsView = () => this.state.items.map((item, index) => {
            return <Item key={ item.id }
                index={ index }
                id={ item.id }
                product={ item.product }
                price={ item.price }
                quantity={ item.quantity }
                onDelete={ () => this.removeItem(index) }
                onDataChange={ (itemData) => this.updateItem(index, itemData) } />
        })

    renderNoItemsView = () => (
        <tr>
            <td colSpan={5}>
                <h4>No items.</h4>
            </td>
        </tr>
    );

    render() {
        return (
            <tbody>
                { this.state.items.length ? this.renderItemsView() : this.renderNoItemsView() }
            </tbody>
        );
    }
};

TBody.propTypes = {
    onRef: PropTypes.func.isRequired,
};

export default TBody;
