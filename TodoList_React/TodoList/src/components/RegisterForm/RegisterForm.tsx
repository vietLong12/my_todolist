import { Formik, Field, Form, ErrorMessage } from "formik";
import s from "./regForm.module.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginAction } from "../../redux/action";
import axios from "axios";
import Swal from "sweetalert2";
import { FidgetSpinner } from "react-loader-spinner";

interface TLoginType {
  username?: string;
  password?: string;
  rePassword?: string;
  email?: string;
}
interface TResetForm {
  resetForm: () => void;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    username: "",
    password: "",
    rePassword: "",
    email: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (values: TLoginType, { resetForm }) => {
    setIsLoading(true);
    const url: string = `http://localhost:8080/login`;
    const data = {
      id: -1,
      username: values.username,
      password: values.password,
      email: values.email,
    };
    const headers = { "Access-Control-Allow-Origin": "*" };
    axios
      .post(url, data, headers)
      .then((response) => {
        if (response.data === "success") {
          Swal.fire({
            title: "Đăng kí  thành công",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          resetForm();
        } else if (response.data === "fail") {
          Swal.fire({
            title: "Tài khoản đã tồn tại",
            icon: "error",
            showConfirmButton: true,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Lỗi không xác định...",
          icon: "error",
          showConfirmButton: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const validate = (values: TLoginType) => {
    const errors: TLoginType = {};

    if (!values.username) {
      errors.username = "Vui lòng nhập tên đăng nhập";
    }

    if (!values.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Vui lòng nhập đúng định dạng email";
    }
    if (values.password.length < 4 || values.password.length > 8) {
      errors.password = "Vui lòng nhập mật khẩu có độ dài từ 4 đến 8 kí tự!";
    }
    if (values.rePassword != values.password) {
      errors.rePassword = "Mật khẩu không khớp!";
    }

    return errors;
  };

  return (
    <div className={`w-lg-25 ${s.containerLogin} mt-5 mb-5`}>
      {isLoading ? (
        <div className="position-fixed">
          <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={["#ff0000", "#00ff00", "#0000ff"]}
          backgroundColor="#F4442E"
          
        />
        </div>
      ) : (
        ""
      )}
      <div className="">
        <h1 className="text-center fs-1 pt-5">Đăng ký</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          {() => (
            <Form className={`p-4 text-start ${s.formContainer}`}>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="username">
                  Tên đăng nhập:
                </label>
                <Field
                  className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Nhập tài khoản của bạn"
                />
                <ErrorMessage
                  className="text-danger"
                  name="username"
                  component="div"
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="email">
                  Email:
                </label>
                <Field
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                />
                <ErrorMessage
                  className="text-danger"
                  name="email"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Mật khẩu:
                </label>
                <Field
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mời bạn nhập mật khẩu"
                />
                <ErrorMessage
                  className="text-danger"
                  name="password"
                  component="div"
                />
              </div>

              <div className="form-group mb-1">
                <label className="form-label" htmlFor="rePassword">
                  Nhập lại mật khẩu:
                </label>
                <Field
                  className="form-control"
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  placeholder="Nhập lại mật khẩu của bạn"
                />
                <ErrorMessage
                  className="text-danger"
                  name="rePassword"
                  component="div"
                />
              </div>

              <div>
                <button type="submit" className="btn btn-warning w-100 mt-3">
                  Đăng ký
                </button>
              </div>
              <div className="d-flex mt-4 justify-content-center">
                <p className="mb-0 me-1">Bạn đã có tài khoản?</p>
                <Link to={"/"}>Đăng nhập</Link>
              </div>
              <div className="d-flex mt-4 justify-content-center">
                <p className="mb-0 me-1">Bạn muốn trải nghiệm thử?</p>
                <Link to={"/trial"}>Bấm để thử</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
