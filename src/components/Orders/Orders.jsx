import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Checkbox } from 'react-bootstrap';

import './Orders.css';

import Order from './Order.jsx';

class Orders extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const orderKeys = Object.keys(this.props.orders);

        const totalPrice = orderKeys.reduce((acc, key) => {
            const order = this.props.orders[key];
            return acc += order.price;
        }, 0);

        return (
            <div>
                {/* Place for Search component */}
                <table style={ { width: '100%' } }>
                    <thead style={ { width: '100%' } }>
                        <tr>
                            <th colSpan={4}>
                                Records 1-{ orderKeys.length } of { orderKeys.length }
                            </th>
                            <th className="text-right">
                                <Button>Delete Selected ({ 0 })</Button>
                            </th>
                        </tr>
                        <tr>
                            <th><Checkbox></Checkbox></th>
                            <th className="sortable">Order Number <span className="caret"></span></th>
                            <th className="sortable">Order Date <span className="caret"></span></th>
                            <th className="text-right sortable">Price <span className="caret"></span></th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-right">Total Price: { totalPrice.toFixed(2) }</td>
                            <td></td>
                        </tr>
                    </tfoot>
                    <tbody>
                        {
                            orderKeys.map((orderKey, index) => {
                                const order = this.props.orders[orderKey];
                                return <Order key={ orderKey }
                                              order={ order }
                                              onOrderClick={ () => this.props.onOrderClick(orderKey) }
                                              onCheckboxClick={ () => this.onOrderSelect(orderKey) } />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({ orders: state.orders });

export default connect(mapStateToProps, {})(Orders);
