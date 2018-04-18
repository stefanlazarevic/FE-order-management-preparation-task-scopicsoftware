import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import OrderForm from '../OrderForm/OrderForm.jsx';
import Orders from '../Orders/Orders.jsx';

import { createOrder } from '../../actions/orders';

import './Panel.css';

class Panel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [],
            inCreateMode: false,
            defaultActiveKey: 'default',
        };
    }

    toggleCreateMode = () => this.setState(state => { return { inCreateMode: !state.inCreateMode }});

    createNewOrder = data => {
        this.props.createOrder(data);
        this.setState(state => {
            const newTabs = state.tabs;
            newTabs.push(data.id);
            return {
                tabs: newTabs
            };
        });
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
                    currentTab: (state.tabs.length === 2 || state.currentTab - 1 === 0) ? 'default' : --state.currentTab
                };
            });
        }
    }

    openTab = id => {
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
            <OrderForm orders={ this.props.orders } onSaveButtonClick={ this.createNewOrder } onCancelButtonClick={ this.toggleCreateMode }/> :
            <Orders onOrderClick={ this.openTab }/>;

        // JSX Template.
        return (
            <Tabs id="tabs" activeKey={ this.state.currentTab } defaultActiveKey='default' onSelect={ this.setActiveKey }>
                <Tab eventKey='default' title="Orders">
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

export default connect(mapStateToProps, { createOrder })(Panel);
