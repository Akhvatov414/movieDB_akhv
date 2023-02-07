import { Pagination } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './index.module.css';

class MoviePagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  onChangeHandle = (page) => {
    const { getList, query } = this.props;
    this.setState({ page });
    getList(query, page);
  };

  render() {
    const { totalResults } = this.props;
    const { page } = this.state;

    return (
      <div className={style.pagination}>
        <Pagination
          total={totalResults > 10000 ? 10000 : totalResults}
          pageSize="20"
          showSizeChanger={false}
          onChange={this.onChangeHandle}
          hideOnSinglePage
          current={page}
          defaultCurrent={1}
        />
      </div>
    );
  }
}

MoviePagination.propTypes = {
  totalResults: PropTypes.number,
  query: PropTypes.string,
  getList: PropTypes.func,
};

export default MoviePagination;
