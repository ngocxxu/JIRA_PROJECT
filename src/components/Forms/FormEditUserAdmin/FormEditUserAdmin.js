import React, { useState, useEffect } from "react";
import { useFormik, withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  SET_SUBMIT_EDIT_USER_ADMIN,
  UPDATE_USER_ADMIN,
  UPDATE_USER_ADMIN_SAGA
} from "../../../redux/constants/Jira/UserFormConst";

function FormEditUserAdmin(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = props; //props này của Formik

  const dispatch = useDispatch();
  // const {userEdit} = useSelector(state => state.UserAdminReducer)

  //component vừa dc load lên thì thằng Submit ở bên component khác sẽ dc nắm kéo qua đây sử dụng
  useEffect(() => {
    //load sự kiện handleSubmit lên component ProjectManagement có chứa nút submit
    dispatch({
      type: SET_SUBMIT_EDIT_USER_ADMIN,
      submitFunction: handleSubmit
    });
  }, []);

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">User ID</p>
            <input
              value={values.id}
              className="form-control"
              name="id"
              disabled
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">User Name</p>
            <input
              value={values.name}
              className="form-control"
              name="name"
              onChange={handleChange}
            ></input>
            {touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Email</p>
            <input
              value={values.email}
              className="form-control"
              name="email"
              onChange={handleChange}
            ></input>
            {touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Phone Number</p>
            <input
              value={values.phoneNumber}
              className="form-control"
              name="phoneNumber"
              onChange={handleChange}
            ></input>
            {touched.phoneNumber ? (
              <div className="text-danger">{errors.phoneNumber}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Password</p>
            <input
              type="password"
              value={values.passWord}
              className="form-control"
              name="passWord"
              onChange={handleChange}
            ></input>
            {touched.passWord ? (
              <div className="text-danger">{errors.passWord}</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

//cha bọc con (LoginJira), con nhận props
const editProjectForm = withFormik({
  //vì mapPropToValue chỉ chạy lần đầu tiên nên nếu ta muốn mapPropsToValues chạy lại mỗi lần render thì dùng
  //props(ý nói mảng arrProjectCategory) của redux(reducer) mà thay đổi thì nó sẽ lập tức render lại các giá trị trong mapPropsToValues
  enableReinitialize: true,

  //lấy props từ các trường name của password và email để đưa vô đây xử lý value
  //mapPropToValue chỉ chạy lần đầu tiên
  mapPropsToValues: (props) => {
    const { userEdit } = props;

    return {
      name: userEdit?.name,
      id: userEdit?.userId,
      email: userEdit?.email,
      phoneNumber: userEdit?.phoneNumber,
      passWord: ""
    };
  },

  //bắt lỗi đăng nhập...
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Name can not be empty!")
      .matches(/^[A-Za-z]+$/, "Name can not a number"),
    passWord: Yup.string()
      .required("Password can not be empty!")
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must be at maximum 32 characters"),
    email: Yup.string()
      .required("Email can not be empty!")
      .email("Email is invalid!"),
    phoneNumber: Yup.string()
      .required("Phone number can not be empty!")
      .min(6, "Phone number must be at least 6 characters")
      .matches(/^[0-9]+$/, "Phone number can not a character")
  }),

  //hàm này lấy dữ liệu từ form sau khi ta submit
  //props từ redux sẽ dc nhận ở đây
  handleSubmit: (values, { props, setSubmitting }) => {
    //khi ng dùng bấm submit thì ta đưa dữ liệu về API
    props.dispatch({
      type: UPDATE_USER_ADMIN_SAGA,
      updateUser: values
    });
  },
  //displayName dùng để phân biệt các formik với nhau
  displayName: "FormEditUserAdminFormik"
})(FormEditUserAdmin);

//mapstatetoprops lấy state từ reducer
const mapStateToProps = (state) => {
  return {
    userEdit: state.UserAdminReducer.userEdit
  };
};

//hàm connect (hàm của redux) bọc thằng LoginJiraWithFormik thì LoginJiraWithFormik sẽ có props của redux
//cha mapStateToProps bọc con editProjectForm nên con nhận props
//lúc này editProjectForm đã sở hữu các thuộc tính của redux
export default connect(mapStateToProps)(editProjectForm);
