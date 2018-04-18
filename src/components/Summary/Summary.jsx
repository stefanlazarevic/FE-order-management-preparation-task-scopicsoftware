import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Summary.css';

class Summary extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { items, price } = this.props;

        const tax = 0.15 * price;

        return (
            <div className="Summary">
                <h3>Totals</h3>
                <table className="Summary__table">
                    <tfoot>
                        <tr>
                            <td>Total Value:</td>
                            <td>{ (price + tax).toFixed(2) }</td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td>Ext. Price:</td>
                            <td>{ price.toFixed(2) }</td>
                        </tr>
                        <tr>
                            <td>Tax:</td>
                            <td>{ tax.toFixed(2) }</td>
                        </tr>
                    </tbody>
                </table>
                <h5>Total items in Order: { items.length }</h5>
            </div>
        );

    }
};

Summary.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Summary;
