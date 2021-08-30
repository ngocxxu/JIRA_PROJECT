import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { signinJiraAction } from "../../../redux/actions/JiraAction/JiraAction";
import { CREATE_PROJECT_SAGA } from "../../../redux/constants/Jira/JiraConst";

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  const dispatch = useDispatch();

  //nơi nhận props con từ cha từ Formik
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props; //props này của Formik

  //setValues của formik là set HẾT lại các giá trị value thành obj mà ko cần phải thông qua hàm handleChange, nó có thể dùng ở bất kì hàm nào trong component này, do handleEditorChange ko phải của formik nên ban đầu ta ko truy cập để lấy description dc


  useEffect(() => {
    //gọi api lấy dữ liệu thẻ select bên dưới
    dispatch({
      type: "GET_ALL_PROJECT_CATEGORY_SAGA",
    });
  }, []);

  const handleEditorChange = (content, editor) => {
  //setFieldValues của formik là set giá trị value mà ko cần phải thông qua hàm handleChange, nó có thể dùng ở bất kì hàm nào trong component này, do handleEditorChange ko phải của formik nên ban đầu ta ko truy cập để lấy description dc
  setFieldValue("description", content); //description đóng vai trò là key và content là value
  };

  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName"></input>
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
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
        <div className="form-group">
          <p>Project Category</p>
          <select
            className="form-control"
            name="categoryId"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {

              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}

//cha bọc con (LoginJira), con nhận props
const createProjectForm = withFormik({
  //vì mapPropToValue chỉ chạy lần đầu tiên nên nếu ta muốn mapPropsToValues chạy lại mỗi lần render thì dùng
  //props(ý nói mảng arrProjectCategory) của redux(reducer) mà thay đổi thì nó sẽ lập tức render lại các giá trị trong mapPropsToValues
  enableReinitialize: true,

  //lấy props từ các trường name của password và email để đưa vô đây xử lý value
  //mapPropToValue chỉ chạy lần đầu tiên
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id, //giúp lấy giá trị mặc định ban đầu cho select khi render từ map. Ta dùng dấu ? vì dữ liệu ban đầu của arrProjectCategory là rỗng và id chưa có giá trị nên báo lỗi
    };
  },

  //bắt lỗi đăng nhập...
  validationSchema: Yup.object().shape({}),

  //hàm này lấy dữ liệu từ form sau khi ta submit
  //props từ redux sẽ dc nhận ở đây
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('value',values); //values này là 1 obj chứa các giá trị return của mapproptostate
    console.log(props);


    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values,
    })

  },
  //displayName dùng để phân biệt các formik với nhau
  displayName: "CreateProjectFormik",
})(CreateProject);

//mapstatetoprops lấy state từ reducer
const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
  };
};

//hàm connect (hàm của redux) bọc thằng LoginJiraWithFormik thì LoginJiraWithFormik sẽ có props của redux
//cha bọc con, con nhận props
export default connect(mapStateToProps)(createProjectForm);
