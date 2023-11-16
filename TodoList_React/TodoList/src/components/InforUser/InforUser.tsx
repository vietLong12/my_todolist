import { Link } from "react-router-dom";
import s from "./InforUser.module.css";

import { useDispatch, useSelector } from "react-redux";
import { resetFormDefaults } from "redux/action";

const InforUser = () => {
  const userData = useSelector((store) => store.saveAccount);
  const username = userData.username;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetFormDefaults());
  };

  return (
    <div className={`container ${s.account}`}>
      <div className="d-inline-block">
        Xin chào, <b>{username ? username : "Username"}</b>
      </div>
      <div className="d-inline-block">
        <Link to="/" onClick={handleLogout}>
          Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default InforUser;
