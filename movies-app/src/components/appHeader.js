import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { debounce } from 'lodash';

export default class AppHeader extends Component {
  state = {
    inputValue: '',
  };

  inputHandler =  debounce((query) => {
    const { getList } = this.props;
    console.log(query);
    getList(query);
  }, 500);

  onChangeHandle = (e) => {
    this.inputHandler(e.target.value);
    this.setState({ inputValue: e.target.value });
  }

  

  render() {
    const { inputValue } = this.state;

    return (
      <div>
        <Form className='header'>
          <Form.Item name='search-form-input'>
            <Input className='input' 
                   placeholder='Type to search...'
                   value={inputValue}
                   onChange={this.onChangeHandle}/>
          </Form.Item>
        </Form>
      </div>        
    )
  }
}
