import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import OrderForm from '../OrderForm/OrderForm.jsx';
import Orders from '../Orders/Orders.jsx';

import { createOrder, updateLockedStatus, updateCheckedStatus } from '../../actions/orders';

import './Panel.css';

class Panel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [],
            selected: 0,
            selectAll: false,
            inCreateMode: false,
            defaultActiveKey: -1,
        };
    }

    toggleCreateMode = () => this.setState(state => { return { inCreateMode: !state.inCreateMode }});

    createNewOrder = data => {
        this.setState({ selectAll: false });
        this.props.createOrder(data);
        this.toggleCreateMode();
    }

    updateOrder = data => {
        this.props.createOrder(data);
        this.removeTab(data.id);
    }

    setActiveKey = (eventKey) => {
        this.setState({
            currentTab: eventKey
        });
    }

    removeTab = name => {
        const index = this.state.tabs.indexOf(name);
        if (index >= 0) {
            this.setState(state => {
                return {
                    tabs: [
                        ...state.tabs.slice(0, index),
                        ...state.tabs.slice(index + 1),
                    ],
                    currentTab: --state.currentTab
                };
            });
        }
    }

    openTab = id => {
        if (this.props.orders[id].isLocked) {
            return;
        }
        this.setState(state => {
            const { tabs } = state;
            const tabIndex = tabs.indexOf(id);
            if (tabIndex < 0) {
                tabs.push(id);
                return { tabs };
            } else {
                return {
                    currentTab: tabIndex
                }
            }
        });
    }

    onOrderSelect = (id, checked) => {
        const order = this.props.orders[id];
        let selected = this.state.selected;

        if (!order.isLocked) {
            if (checked) {
                selected += 1;
            } else {
                selected -= 1;
            }
        }

        this.setState(state => { return { selected } });

        this.props.updateCheckedStatus(id, checked);
    }

    onLockClick = (id, locked) => {
        const order = this.props.orders[id];
        let selected = this.state.selected;

        if (locked) {
            if (order.isSelected) {
                selected -= 1;
            }
        } else {
            if (order.isSelected) {
                selected += 1;
            }
        }

        this.setState(state => { return { selected } });

        this.props.updateLockedStatus(id, locked);
    }

    onAllCheckboxClick = () => {
        const orderKeys = Object.keys(this.props.orders);
        const selectAll = !this.state.selectAll;
        let selected = 0;

        orderKeys.reduce((acc, key) => {
            const order = this.props.orders[key];
            this.props.updateCheckedStatus(key, selectAll);
            if (selectAll && !order.isLocked) {
                selected++;
            }
            return 0;
        }, 0);

        this.setState(state => { return { selectAll, selected } });
    }


    render() {
        const TabHeaderTitle = this.state.inCreateMode ? 'New Order' : 'Order List';

        const OrderTabs = this.state.tabs.map((order, index) => {
            return (
                <Tab key={ index } eventKey={ index } title={ order }>
                    <SectionHeader title={ `Edit Order ${ order }` } />
                    <OrderForm order={ this.props.orders[order] } onSaveButtonClick={ this.updateOrder } onCancelButtonClick={ () => this.removeTab(order) }/>
                </Tab>
            );
        });

        const tabBody = this.state.inCreateMode ?
            <OrderForm orders={ this.props.orders }
                       onSaveButtonClick={ this.createNewOrder }
                       onCancelButtonClick={ this.toggleCreateMode }
                /> :
                <Orders orders={ this.props.orders }
                        selectAll={ this.state.selectAll }
                        selected={ this.state.selected }
                        onOrderClick={ this.openTab }
                        removeTab={ this.removeTab }
                        onOrderSelect={ this.onOrderSelect }
                        onLockClick={ this.onLockClick }
                        onAllCheckboxClick={ this.onAllCheckboxClick }
                />;

        // JSX Template.
        return (
            <Tabs id="tabs" activeKey={ this.state.currentTab }
                            defaultActiveKey={-1}
                            onSelect={ this.setActiveKey }>

                <Tab eventKey={-1} title="Orders">
                    <SectionHeader title={ TabHeaderTitle }
                               includeActionButton={ !this.state.inCreateMode }
                               actionButtonText={ 'Create New' }
                               onActionButtonClick={ this.toggleCreateMode } />
                    { tabBody }
                </Tab>
                { OrderTabs }
            </Tabs>
        );
    }
}

const mapStateToProps = state => ({ orders: state.orders });

export default connect(
    mapStateToProps,
    {
        createOrder,
        updateLockedStatus,
        updateCheckedStatus
    }
)(Panel);
