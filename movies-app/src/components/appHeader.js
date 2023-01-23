import React, { Component } from 'react';
import { Form, Input } from 'antd';

export default class AppHeader extends Component {
  render() {
    return (
      <div>
        <Form className='header'>
          <Form.Item name='search-form-input'>
            <Input className='input' placeholder='Type to search...'/>
          </Form.Item>
        </Form>
      </div>        
    )
  }
}
