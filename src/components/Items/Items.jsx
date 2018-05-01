import React, { Component } from 'react';

import './style/Items.css';

import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import ItemTable from './ItemTable.jsx';

class Items extends Component {
    componentDidMount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(this);
        }
    }

    componentWillUnmount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(undefined);
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    addNewItem = () => this.ItemTable.TBody.addItem();

    getItems = () => this.ItemTable.TBody.getItems();

    render() {
        return (
            <div className="items">
                <SectionHeader headingType={4}
                    title={ 'Items' }
                    includeActionButton={ true }
                    actionButtonText={ 'New Item' }
                    onActionButtonClick={ this.addNewItem } />
                <ItemTable onRef={ItemTable => (this.ItemTable = ItemTable)}
                           handleItemUpdate={ this.props.onItemDataChange }
                           items={ this.props.items }/>
            </div>
        );
    }
}

export default Items;
