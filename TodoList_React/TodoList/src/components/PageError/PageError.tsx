import { Link } from "react-router-dom";

const PageError = () => {
  return (
    <div className="error-page">
      <h1>Error Page!!!</h1>
      <p>Vui lòng kiểm tra lại đường dẫn.</p>
      <Link to="/">Quay lại trang chủ</Link>
    </div>
  );
};

export default PageError;
