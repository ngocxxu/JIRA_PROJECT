import React,{useEffect} from "react";
import { Editor } from "@tinymce/tinymce-react";
import {  withFormik } from "formik";
import { connect, useSelector,useDispatch } from "react-redux";
import * as Yup from 'yup';
import { signinJiraAction } from "../../../redux/actions/JiraAction/JiraAction";





function CreateProject(props) {

  const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)

  const dispatch = useDispatch();


  //nơi nhận props con từ cha từ Formik
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props //props này của Formik 

  useEffect(() => {
    //gọi api lấy dữ liệu thẻ select bên dưới
    dispatch({
      type: 'GET_ALL_PROJECT_CATEGORY_SAGA',

    })


  },[])

  const handleEditorChange = (content, editor) => {
  };

  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <form className="container" onSubmit={handleSubmit}>
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
          <select className="form-control" name="categoryId">
            {arrProjectCategory.map((item,index) => {
              return <option value={item.id} key={index}>{item.projectCategoryName}</option>
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
  //lấy props từ các trường name của password và email để đưa vô đây xử lý
  mapPropsToValues: () => ({ abc: "", }),

  //bắt lỗi đăng nhập...
  validationSchema: Yup.object().shape({

  }),
  
  //hàm này lấy dữ liệu từ form sau khi ta submit
  //props từ redux sẽ dc nhận ở đây
  handleSubmit: (values, {props, setSubmitting }) => {





  },
  //displayName dùng để phân biệt các formik với nhau
  displayName: "CreateProjectFormik",
})(CreateProject)

//hàm connect (hàm của redux) bọc thằng LoginJiraWithFormik thì LoginJiraWithFormik sẽ có props của redux
//cha bọc con, con nhận props
export default connect()(createProjectForm)
