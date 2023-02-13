import { Alert } from 'antd';

const ErrorMessage = () => {
  return (
    <>
      <Alert message="Упс!" description="Не удалось получить список фильмов" type="error" />
    </>
  );
};

export default ErrorMessage;
