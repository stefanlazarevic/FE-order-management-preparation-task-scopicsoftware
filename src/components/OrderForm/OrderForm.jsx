import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FormActionBar from '../FormActionBar/FormActionBar.jsx';
import Summary from '../Summary/Summary.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import UniqueIdGenerator from '../Helpers/UniqueIdGenerator';
import Items from '../Items/Items.jsx';

const monthStartDate = moment().startOf('month');
const monthEndDate = moment().endOf('month');


class OrderForm extends Component {
    constructor(props) {
        super(props);

        const { order } = props;

        this.state = {
            id: order ? order.id : UniqueIdGenerator(props.orders)(),
            date: order ? order.date : moment(),
            items: order ? order.items : [],
            price: order ? order.price : 0,
        };
    }

    onDatePickerChange = date => this.setState({ date });

    handleSaveButtonClick = () => this.props.onSaveButtonClick(this.state);

    onNewItemButtonClick = () => {
        const newEmptyItem = {
            product: '',
            quantity: 0,
            price: 0,
        };

        this.setState(state => {
            const newItems = state.items;
            newItems.unshift(newEmptyItem);
            return {
                items: newItems
            };
        });
    }

    onTrashButtonClick = index => {
        this.setState(state => {
            const items = [
                ...state.items.slice(0, index),
                ...state.items.slice(index + 1),
            ];

            return { items };
        });
    }

    onItemInputChange = (evt, property, index) => {
        const value = evt.target.value;
        this.setState(state => {
            const items = state.items.slice();
            items[index][property] = value;
            const price = items.reduce((sum, item) => {
                return sum += item.quantity * item.price;
            }, 0);
            return { items, price };
        });
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
                                    <FormControl.Static>{ this.state.id }</FormControl.Static>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalDate">
                                <Col componentClass={ ControlLabel } sm={3}>
                                    Date:
                                </Col>
                                <Col sm={9}>
                                    <DatePicker fixedHeight className="form-control"
                                        minDate={ monthStartDate }
                                        maxDate={ monthEndDate }
                                        selected={ this.state.date }
                                        onChange={ this.onDatePickerChange } />
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
                        <Summary items={ this.state.items } price={ this.state.price }/>
                    </Col>
                </Row>
                <Row>
                    <Items items={ this.state.items } onNewItemButtonClick={ this.onNewItemButtonClick }
                                                      onTrashButtonClick={ this.onTrashButtonClick }
                                                      onItemInputChange={ this.onItemInputChange } />
                </Row>
                <FormActionBar onCancelButtonClick={ this.props.onCancelButtonClick }
                               onSaveButtonClick={ this.handleSaveButtonClick } />
            </div>
        );
    }
}

export default OrderForm;
