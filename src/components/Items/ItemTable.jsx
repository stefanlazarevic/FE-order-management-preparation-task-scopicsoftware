import React, { Component } from 'react';
import PropTypes from 'prop-types';

import THead from './ItemTable/THead.jsx';
import TFoot from './ItemTable/TFoot.jsx';
import TBody from './ItemTable/TBody.jsx';

class ItemTable extends Component {
    componentDidMount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(this)
        }
    }

    componentWillUnmount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(undefined)
        }
    }

    render() {
        return (
            <table className="table">
                <THead total={0} onRef={ THead => (this.THead = THead) } />
                <TFoot />
                <TBody onRef={TBody => (this.TBody = TBody)}
                       onItemUpdate={ this.props.handleItemUpdate }
                       onItemAmountChange={ total => this.THead.updateTotal(total) }
                       items={ this.props.items }/>
            </table>
        );
    }
};

ItemTable.propTypes = {
    onRef: PropTypes.func.isRequired,
};

export default ItemTable;
