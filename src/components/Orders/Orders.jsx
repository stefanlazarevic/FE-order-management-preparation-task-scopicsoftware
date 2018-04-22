import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from 'react-bootstrap';

import './Orders.css';

import Order from './Order.jsx';
import SearchForm from '../OrderForm/SearchForm.jsx';

// Part of sortAlphaNum method.
const reA = /[^a-zA-Z]/g;
const reN = /[^0-9]/g;

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            sortBy: '',
        };
    }

    setSortBy = key => this.setState(state => ({ sortBy: key }));

    setSearchTerm = searchTerm => this.setState(state => ({ searchTerm }));

    /**
     * CREDITS: https://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array#answer-4340339
     */
    sortAlphaNum = (a, b) => {
        const aA = a.replace(reA, '');
        const bA = b.replace(reA, '');
        if (aA === bA) {
            const aN = parseInt(a.replace(reN, ''), 10);
            const bN = parseInt(b.replace(reN, ''), 10);
            return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
            return aA > bA ? 1 : -1;
        }
    }

    render() {
        const regexp = new RegExp(`^${this.state.searchTerm.toUpperCase()}|ORD-${this.state.searchTerm}`);

        // Filter orders by search term to reduce size of array if any term is applied.
        const orderKeys = Object.keys(this.props.orders).filter(id => regexp.test(id));

        // Apply sorting if applied.
        if (this.state.sortBy === 'id') {
            orderKeys.sort(this.sortAlphaNum);
        } else if (this.state.sortBy === 'price') {
            orderKeys.sort((key1, key2) => {
                const o1 = this.props.orders[key1];
                const o2 = this.props.orders[key2];

                return o1.price - o2.price;
            });
        } else if (this.state.sortBy === 'date') {
            orderKeys.sort((key1, key2) => {
                const o1 = this.props.orders[key1];
                const o2 = this.props.orders[key2];

                return new Date(o1.date) - new Date(o2.date);
            });
        }

        // Calculate total price from searched orders.
        const totalPrice = orderKeys.reduce((acc, key) => acc += this.props.orders[key].price, 0);

        // Map each order to the React Order object.
        const orders = orderKeys.length ? orderKeys.map((key, index) => {
            const order = this.props.orders[key];
            return <Order key={ key }
                          order={ order }
                          onOrderClick={
                              () => this.props.onOrderClick(key) }
                          onCheckboxClick={
                              (checkedStatus) => this.props.onOrderSelect(key, checkedStatus) }
                          onLockClick={
                              (checkedStatus) => this.props.onLockClick(key, checkedStatus) }
                          onDeleteButtonClick={ () => this.props.onDeleteOrder(key) } />
        }) : <tr>
            <td>
                <h4>No orders.</h4>
            </td>
        </tr>;

        return (
            <div>
                <div className="pull-right">
                    <SearchForm onChange={ this.setSearchTerm }/>
                    <br />
                </div>
                <table style={ { width: '100%' } }>
                    <thead style={ { width: '100%' } }>
                        <tr className="tr--gray">
                            <th colSpan={4}>
                                Records { orderKeys.length ? 1 : 0 }-{ orderKeys.length } of { orderKeys.length }
                            </th>
                            <th className="text-right">
                                {/* Delete selected button with selected items number. */}
                                <Button onClick={ () => this.props.onDeleteOrder('selected') }>
                                    <span>Delete Selected </span>
                                    (
                                        {
                                            Object.keys(this.props.orders).reduce((sum, key) => {
                                            const order = this.props.orders[key];
                                            return sum += order.isSelected && !order.isLocked;
                                            }, 0)
                                        }
                                    )
                                </Button>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <Checkbox onChange={ this.props.onAllCheckboxClick } checked={ this.props.selectAll } />
                            </th>
                            <th className="sortable" onClick={ () => this.setSortBy('id') }>
                                <span>Order Number </span>
                                <span className={`caret ${this.state.sortBy === 'id' ? 'text-danger' : ''}`}></span>
                            </th>
                            <th className="sortable" onClick={ () => this.setSortBy('date') }>
                                <span>Order Date </span>
                                <span className={`caret ${this.state.sortBy === 'date' ? 'text-danger' : ''}`}></span>
                            </th>
                            <th className="text-right sortable" onClick={ () => this.setSortBy('price') }>
                                <span>Price </span>
                                <span className={`caret ${this.state.sortBy === 'price' ? 'text-danger' : ''}`}></span>
                            </th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr className="tr--gray">
                            <td colSpan={3}></td>
                            <td className="text-right">
                                <strong>Total Price: { (totalPrice + totalPrice * 0.15).toFixed(2) }</strong>
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                    <tbody>{ orders }</tbody>
                </table>
            </div>
        );
    }
};

Orders.propTypes = {
    orders: PropTypes.object.isRequired,
    onDeleteOrder: PropTypes.func.isRequired,
    onAllCheckboxClick: PropTypes.func.isRequired,
    selectAll: PropTypes.bool
};

export default Orders;
