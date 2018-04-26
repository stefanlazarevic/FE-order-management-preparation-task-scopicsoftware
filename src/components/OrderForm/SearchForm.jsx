import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const SearchForm = props => <FormControl placeholder="Search"
                                         type="text"
                                         onChange={ (evt) => props.onChange(evt.target.value) } />

SearchForm.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default SearchForm;
