import React, { useState } from "react";
import { Input, Button } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  InstagramOutlined,
  GithubOutlined
} from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { withFormik, Formik } from "formik";
import { USER_SIGNIN_API } from "../../../redux/constants/Jira/JiraConst";
import { signinJiraAction } from "../../../redux/actions/JiraAction/JiraAction";
import RegisterJira from "./RegisterJira";
import { USER_FORM_SERVICE } from "../../../redux/constants/Jira/UserFormConst";
import { NavLink } from "react-router-dom";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});

function LoginJira(props) {
  //nơi nhận props con từ cha
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props; //props này của Formik

  const { userForm } = useSelector((state) => state.RegisterReducer);

  const dispatch = useDispatch();

  return (
    <form onSubmit={handleSubmit} className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <div className='d-flex'>
          <button type="button" className="btn text-white btn-signin">
            <NavLink
            className="text-white"
              to="/login"
              // activeClassName="active-nav-item"
              // activeStyle={{ fontWeight: "bold" }}
            >
              Login
            </NavLink>
          </button>
          <button type="button" className="btn text-white btn-signup">
          <NavLink
              to="/register"
              className="text-white"
              // activeClassName="active-nav-item"
              // activeStyle={{ fontWeight: "bold" }}
            >
              Register
            </NavLink>
          </button>
        </div>
        <div className=" bg-signin">
          <h2 className="text-center text-login" style={{fontWeight: '700'}}>JIRA PROJECT</h2>
          {!userForm ? (
            <div>
              <h6 className="text-center">Sign Into Your Account</h6>
              <div className="w-100 mt-3">
                {/* truyền hàm handlechange của formik vào */}
                <Input
                  onChange={handleChange}
                  name="email"
                  size="large"
                  placeholder="Your Email"
                  prefix={<UserOutlined />}
                />
                {touched.email ? (
                  <div className="text-danger">{errors.email}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="w-100 mt-3">
                <Input
                  onChange={handleChange}
                  name="password"
                  size="large"
                  placeholder="Your Password"
                  prefix={<LockOutlined />}
                  type="password"
                />
              </div>
              {touched.password ? (
                <div className="text-danger">{errors.password}</div>
              ) : (
                ""
              )}
              <button
                className="btn text-white w-100 my-4 btn-grad "
              >
                Login
              </button>
            </div>
          ) : (
            <RegisterJira></RegisterJira>
          )}
          <div className="social d-flex justify-content-around align-items-center">
            <div>
              <a
                className="text-decoration-none"
                href="https://github.com/ngocxxu"
              >
                <Button
                  className="hover-github"
                  type="ghost"
                  shape="circle"
                  icon={<GithubOutlined />}
                  size="large"
                ></Button>
              </a>
            </div>
            <div>
              <a
                className="text-decoration-none"
                href="https://www.facebook.com/ngocquach97/"
              >
                <Button
                  className="hover-facebook"
                  type="ghost"
                  shape="circle"
                  icon={<IconFont type="icon-facebook" />}
                  size="large"
                ></Button>
              </a>
            </div>
            <div>
              <a
                className="text-decoration-none"
                href="https://www.instagram.com/vong_paracord/"
              >
                <Button
                  className="hover-instagram"
                  type="ghost"
                  shape="circle"
                  icon={<InstagramOutlined />}
                  size="large"
                ></Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

//cha bọc con (LoginJira), con nhận props
const LoginJiraWithFormik = withFormik({
  //lấy props từ các trường name của password và email để đưa vô đây xử lý
  mapPropsToValues: () => ({ email: "", password: "" }),

  handleChange: (e) => {
    console.log(e);
  },

  //bắt lỗi đăng nhập...
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email can not be empty!")
      .email("Email is invalid!"),
    password: Yup.string()
      .required("Password can not be empty!")
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must be at maximum 32 characters")
  }),

  //hàm này lấy dữ liệu từ form sau khi ta submit
  //props từ redux sẽ dc nhận ở đây
  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    //tạo ra action
    props.dispatch(signinJiraAction(email, password));

    console.log(props); //ở đây ta thấy trong props chứa dispatch của redux
  },
  //displayName dùng để phân biệt các môi trường trên dev tool
  displayName: "LoginJira"
})(LoginJira);

//hàm connect (hàm của redux) bọc thằng LoginJiraWithFormik thì LoginJiraWithFormik sẽ có props của redux
//cha bọc con, con nhận props
export default connect()(LoginJiraWithFormik);
