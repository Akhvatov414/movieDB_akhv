import { Spin } from 'antd';

const Spinner = ({ loadingStatus }) => {
  return (
    <>
      <div className="spinner" style={{ display: loadingStatus === 'loaded' ? 'none' : 'flex', alignItems: 'center' }}>
        <Spin size="large" />
      </div>
    </>
  );
};

export default Spinner;
