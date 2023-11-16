import { Formik, Field, Form, ErrorMessage } from "formik";
import s from "./regForm.module.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { FidgetSpinner } from "react-loader-spinner";
import { useState } from "react";

interface TLoginType {
  username?: string;
  password?: string;
  rePassword?: string;
  email?: string;
}
interface TResetForm {
  resetForm: () => void;
}

const FindPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    username: "",
    password: "",
    rePassword: "",
    email: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (values: TLoginType) => {
    setIsLoading(true);
    const url: string = `http://localhost:8080/login/findPassword/${values.username}/${values.email}`;
    const data = {};

    const headers = { "Access-Control-Allow-Origin": "*" };
    axios
      .post(url, data, headers)
      .then((response) => {
        if (response.data === "not found") {
          Swal.fire({
            title: "Không tìm thấy tài khoản của bạn",
            icon: "error",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            title: "Mật khẩu của bạn là: " + response.data,
            icon: "success",
            showConfirmButton: true,
          });
        }
      })
      .catch((err) =>
        Swal.fire({
          title: err.message,
          icon: "error",
          confirmButtonText: "Okay",
        })
      )
      .finally(() => setIsLoading(false));
  };

  const validate = (values: TLoginType) => {
    const errors: TLoginType = {};

    if (!values.username) {
      errors.username = "Vui lòng nhập tên đăng nhập";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Vui lòng nhập đúng định dạng email";
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
        <h1 className="text-center fs-1 pt-5">Tìm mật khẩu</h1>
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

              <div>
                <button type="submit" className="btn btn-secondary w-100 mt-3">
                  Tìm kiếm...
                </button>
              </div>
              <div className="d-flex mt-4 justify-content-center">
                <p className="mb-0 me-1">Bạn đã có tài khoản?</p>
                <Link to={"/"}>Đăng nhập</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FindPassword;
