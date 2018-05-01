import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FormActionBar from '../FormActionBar/FormActionBar.jsx';
import Summary from '../Summary/Summary.jsx';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import UniqueIdGenerator from '../Helpers/UniqueIdGenerator';
import Items from '../Items/Items.jsx';
import moment from 'moment';

import DatePickerWrap from '../DatePickerWrap/DatePickerWrap.jsx';

class OrderForm extends Component {
    constructor(props) {
        super(props);

        const generator = UniqueIdGenerator(this.props.orders);

        this.id = this.props.order ? this.props.order.id : generator();
        this.date = this.props.order ? this.props.order.date : moment();
        this.items = this.props.order ? this.props.order.items : [];
    }

    componentDidMount() {
        this.computeSummary(this.items);
    }

    handleSaveButtonClick = () => {
        const formData = {
            id: this.id,
            date: this.DatePickerWrap.getDate(),
            items: this.Items.getItems(),
            price: this.price,
            isSelected: this.props.order ? this.props.order.isSelected : false,
            isLocked: this.props.order ? this.props.order.isLocked : false,
        };

        this.props.onSaveButtonClick(formData);
    }

    shouldComponentUpdate() {
        return false;
    }

    computeSummary = items => {
        const { length } = items;

        const price = items.reduce((acc, item) => {
            return acc += item.price * item.quantity;
        }, 0);

        this.price = price;

        const tax = price * 0.15;

        const summary = {
            length,
            tax,
            price
        };

        this.Summary.update(summary);
    }

    render() {
        return (
            <div>
                <FormActionBar onSaveButtonClick={ this.handleSaveButtonClick }
                                onCancelButtonClick={ this.props.onCancelButtonClick } />
                <Row>
                    <Col md={7}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalOrder">
                                <Col componentClass={ ControlLabel } sm={3}>
                                    Order No.:
                                </Col>
                                <Col sm={9}>
                                    <FormControl.Static>{ this.id }</FormControl.Static>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalDate">
                                <Col componentClass={ ControlLabel } sm={3}>
                                    Date:
                                </Col>
                                <Col sm={9}>
                                    <DatePickerWrap onRef={ DatePickerWrap => (this.DatePickerWrap = DatePickerWrap)}
                                                    date={ this.date } />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalTax">
                                <Col componentClass={ ControlLabel } sm={3}>
                                    Tax:
                                </Col>
                                <Col sm={9}>
                                    <FormControl.Static>15%</FormControl.Static>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md={5}>
                        <Summary onRef={ Summary => (this.Summary = Summary) }/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Items items={ this.items } onRef={ Items => (this.Items = Items) } onItemDataChange={ this.computeSummary }/>
                    </Col>
                </Row>
                <FormActionBar onCancelButtonClick={ this.props.onCancelButtonClick }
                            onSaveButtonClick={ this.handleSaveButtonClick } />
            </div>
        );
    }
}

export default OrderForm;
