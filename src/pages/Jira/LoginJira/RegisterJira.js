import React, { useState } from "react";
import { Input, Button } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { connect, useDispatch } from "react-redux";
import {
  UserOutlined,
  LockOutlined,
  WhatsAppOutlined,
  AliwangwangOutlined,
  DribbbleOutlined,
  FacebookOutlined,
  InstagramOutlined,
  GithubOutlined
} from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { withFormik, Formik } from "formik";
import { USER_SIGNIN_API } from "../../../redux/constants/Jira/JiraConst";
import { signinJiraAction } from "../../../redux/actions/JiraAction/JiraAction";
import {
  USER_FORM_SERVICE,
  USER_SIGN_UP_SAGA
} from "../../../redux/constants/Jira/UserFormConst";
import { NavLink } from "react-router-dom";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});


export default function RegisterJira(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      passWord: "",
      email: "",
      phoneNumber: ""
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
      .required("Name can not be empty!").matches(/^[A-Za-z]+$/, 'Name can not a number'),
      passWord: Yup.string()
        .required("Password can not be empty!")
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be at maximum 32 characters"),
        email: Yup.string()
        .required("Email can not be empty!")
        .email("Email is invalid!"),
        phoneNumber: Yup.string().required("Phone number can not be empty!").min(6, "Phone number must be at least 6 characters").matches(/^[0-9]+$/, 'Phone number can not a character')
      }),
    onSubmit: (values) => {
      console.log("values", values);
      dispatch({
        type: USER_SIGN_UP_SAGA,
        signUpForm: values,
      })
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <div>
          <button type="button" className="btn text-white btn-signup">
            <NavLink
            className="text-white"
              to="/login"
              // activeClassName="active-nav-item"
              // activeStyle={{ fontWeight: "bold" }}
            >
              Login
            </NavLink>
          </button>
          <button type="button" className="btn text-white btn-signin">
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
          <h2 className="text-center text-login" style={{ fontWeight: "700" }}>
            JIRA PROJECT
          </h2>
          <div>
            <h6 className="text-center">Create An Account</h6>
            <div className="w-100 mt-3">
              <Input
                onChange={formik.handleChange}
                name="name"
                size="large"
                placeholder="Full Name"
                prefix={<DribbbleOutlined />}
              />
              {formik.touched.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : (
                ""
              )}
            </div>
            <div className="w-100 mt-3">
              <Input
                onChange={formik.handleChange}
                name="email"
                size="large"
                placeholder="Email Address"
                prefix={<UserOutlined />}
              />
              {formik.touched.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : (
                ""
              )}
            </div>
            <div className="w-100 mt-3">
              <Input
                onChange={formik.handleChange}
                name="passWord"
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
                type="password"
              />
            </div>
            {formik.touched.passWord ? (
              <div className="text-danger">{formik.errors.passWord}</div>
            ) : (
              ""
            )}
            <div className="w-100 mt-3">
              <Input
                onChange={formik.handleChange}
                name="phoneNumber"
                size="large"
                placeholder="Phone Number"
                prefix={<WhatsAppOutlined />}
              />
              {formik.touched.phoneNumber ? (
                <div className="text-danger">{formik.errors.phoneNumber}</div>
              ) : (
                ""
              )}
            </div>
            <button className="btn text-white w-100 my-4 button-login ">
              Register
            </button>
          </div>
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
