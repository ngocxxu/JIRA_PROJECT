import { Editor } from "@tinymce/tinymce-react";
import React, { useState, useEffect } from "react";
import { withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_EDIT_PROJECT,
} from "../../../redux/constants/Jira/DrawerConst";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constants/Jira/JiraConst";

function FormEditProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  //nơi nhận props con từ cha từ Formik
  //nơi bóc tách từ props Formik
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props; //props này của Formik

  const dispatch = useDispatch();
  const callBackSubmit = useSelector(
    (state) => state.DrawerJiraReducer.callBackSubmit
  );

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   alert("Submit");
  // };

  //component vừa dc load lên thì thằng Submit ở bên component khác sẽ dc nắm kéo qua đây sử dụng
  useEffect(() => {
    //gọi api load project category
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });

    //load sự kiện handleSubmit lên component ProjectManagement có chứa nút submit
    dispatch({
      type: SET_SUBMIT_EDIT_PROJECT,
      submitFunction: handleSubmit,
    });
  }, []);

  const handleEditorChange = (content, editor) => {
    //setFieldValues của formik là set giá trị value mà ko cần phải thông qua hàm handleChange, nó có thể dùng ở bất kì hàm nào trong component này, do handleEditorChange ko phải của formik nên ban đầu ta ko truy cập để lấy description dc
    setFieldValue("description", content); //description đóng vai trò là key và content là value
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project ID</p>
            <input
              value={values.id}
              className="form-control"
              name="id"
              disabled
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Name</p>
            <input
              value={values.projectName}
              className="form-control"
              name="projectName"
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select name="categoryId" className="form-control">
              {arrProjectCategory.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description"
              initialValue={values.description}
              value={values.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={handleEditorChange}
            />
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
    const { projectEdit } = props;

    return {
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      description: projectEdit?.description,
      categoryId: projectEdit?.categoryId,
    };
  },

  //bắt lỗi đăng nhập...
  validationSchema: Yup.object().shape({}),

  //hàm này lấy dữ liệu từ form sau khi ta submit
  //props từ redux sẽ dc nhận ở đây
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("value", values); //values này là 1 obj chứa các giá trị return của mapproptovalue
    console.log(props);

    //khi ng dùng bấm submit thì ta đưa dữ liệu về API
    props.dispatch({
      type: 'UPDATE_PROJECT_SAGA',
      projectUpdate: values, //values này ứng với những giá trị mới mà ta đã thay đổi, gửi lên saga, saga xử lý sang api, gửi value lên api xử lý
    });
    
  },
  //displayName dùng để phân biệt các formik với nhau
  displayName: "EditProjectFormik",
})(FormEditProject);

//mapstatetoprops lấy state từ reducer
const mapStateToProps = (state) => {
  return {
    projectEdit: state.ProjectReducer.projectEdit,
  };
};

//hàm connect (hàm của redux) bọc thằng LoginJiraWithFormik thì LoginJiraWithFormik sẽ có props của redux
//cha mapStateToProps bọc con editProjectForm nên con nhận props
//lúc này editProjectForm đã sở hữu các thuộc tính của redux
export default connect(mapStateToProps)(editProjectForm);
