import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';

const monthStartDate = moment().startOf('month');
const monthEndDate = moment().endOf('month');

class DatePickerWrap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date || moment(),
        };
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    onChange = date => this.setState(state => ({ date }));

    getDate = () => this.state.date;

    render() {
        return (
            <DatePicker fixedHeight className="form-control"
                minDate={ monthStartDate }
                maxDate={ monthEndDate }
                selected={ this.state.date }
                onChange={ this.onChange } />
        );
    }
};

DatePickerWrap.propTypes = {
    date: PropTypes.object,
    onRef: PropTypes.func.isRequired,
};

export default DatePickerWrap;
