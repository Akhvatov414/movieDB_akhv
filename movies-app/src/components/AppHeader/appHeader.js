import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { debounce } from 'lodash';

import style from './index.module.css';
import PropTypes from 'prop-types';

export default class AppHeader extends Component {
  state = {
    inputValue: '',
  };

  inputHandler =  debounce((query, page) => {
    const { getList, setQuery } = this.props;
    setQuery(query);
    getList(query, page);
  }, 500);

  onChangeHandle = (e) => {
    this.inputHandler(e.target.value, 1);
    this.setState({ inputValue: e.target.value });
  }  

  render() {
    const { inputValue } = this.state;

    return (
      <div>
        <Form className={style.header}>
          <Form.Item name='search-form-input'>
            <Input className={style.input }
                   placeholder='Type to search...'
                   value={inputValue}
                   onChange={this.onChangeHandle}/>
          </Form.Item>
        </Form>
      </div>        
    )
  }
}

AppHeader.propTypes = {
  getList: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
};