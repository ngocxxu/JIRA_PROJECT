import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Select, Radio, Slider } from "antd";
import { GET_ALL_PROJECT_SAGA } from "../../../redux/constants/Jira/JiraConst";
import {
  CREATE_TASK_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  GET_STATUS,
  GET_STATUS_SAGA,
} from "../../../redux/constants/Jira/TaskTypeConstant";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Jira/PriorityConst";
import { GET_USER_BY_PROJECT_SAGA } from "../../../redux/constants/Jira/UserConst";

const { Option } = Select;

function FormCreateTask({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
}) {
  const dispatch = useDispatch();

  const { arrProject } = useSelector((state) => state.ProjectJiraReducer);

  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);

  const { arrPriority } = useSelector((state) => state.PriorityReducer);

  const { arrUser } = useSelector((state) => state.UserJiraReducer);

  const { arrStatus } = useSelector((state) => state.StatusReducer);

  //hàm biến đổi option cho thẻ select
  const userOptions = arrUser.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  const [size, setSize] = useState("default");

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: "GET_USER_API",
      keyWord: "",
    });
    dispatch({
      type: GET_STATUS_SAGA,
    });
    //đưa hàm handleSubmit lên drawer reducer để cập nhật cho nút submit cũ
    dispatch({
      type: 'SET_BUTTON_SUBMIT_CREATE_TASK',
      submitFunction: handleSubmit,
    })
  }, []);

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            //SET lại giá trị value cho hàm handleCHange nhận dc
            setFieldValue("projectId", e.target.value)

            //dispatch làm thay đổi dữ liệu arrUser cho trường assignees
            //gửi giá trị value lên api khi ng dùng chọn
            dispatch({
              type: GET_USER_BY_PROJECT_SAGA,
              idProject: e.target.value,
            });
          }}
        >
          {arrProject.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <p>Task Name</p>
        <input
          onChange={handleChange}
          name="taskName"
          className="form-control"
        ></input>
      </div>
      <div className="form-group">
        <p>Status ID</p>
        <select
          onChange={handleChange}
          name="statusId"
          className="form-control"
        >
          {arrStatus.map((statusID, index) => {
            return (
              <option key={index} value={statusID.statusId}>
                {statusID.statusName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select name="priorityId" className="form-control">
              {arrPriority.map((project, index) => {
                return (
                  <option key={index} value={project.id}>
                    {project.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p>Task Type</p>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
              {arrTaskType.map((project, index) => {
                return (
                  <option key={index} value={project.id}>
                    {project.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
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
          onEditorChange={(content, editor) => {
            setFieldValue("description", content);
          }}
        />
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              size={size}
              options={userOptions}
              optionFilterProp="label" //vì onSearch chỉ trả giá trị value, mà ta cần giá trị label để search nên ta dùng optionFilterProp để biến đổi
              placeholder="Please assign your member"
              // defaultValue={["a12", "a13"]}
              style={{ width: "100%" }}
              onSelect={(value) => {}}
              //onSearch, search dựa trên option , option có sẵn gì nó sẽ tìm ra cái đó
              onChange={(values) => {
                //onChange này của antd nên ta phải setFieldValue gán values cho mảng listUserAsign
                setFieldValue("listUserAsign", values);
              }}
            ></Select>
          </div>
          <div className="col-6">
            <p>Time Tracking</p>
            {/* max là chiều dài của thanh thời gian slider */}
            <Slider
              defaultValue={30}
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p>Original Estimate</p>
            <input
              onChange={handleChange}
              defaultValue={0}
              min={0}
              type="number"
              name="originalEstimate"
              className="form-control"
            ></input>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <p>Time spent</p>
                <input
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                  defaultValue={0}
                  min={0}
                  type="number"
                  name="timeTrackingSpent"
                  className="form-control"
                ></input>
              </div>
              <div className="col-6">
                <p>Time remaining</p>
                <input
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                  defaultValue={0}
                  min={0}
                  type="number"
                  name="timeTrackingRemaining"
                  className="form-control"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const createTaskForm = withFormik({
  //kích hoạt thuộc tính enableReinitialize để set giá trị value mặc định ban đầu dc chọn cho thẻ option
  enableReinitialize: true,
  //lấy props từ các trường name của password và email để đưa vô đây xử lý value
  //mapPropToValue chỉ chạy lần đầu tiên

  mapPropsToValues: (props) => {
    const { arrProject, arrTaskType, arrPriority, arrStatus } = props;

    //hàm if bên dưới nghĩa là nếu trong mảng arrProject có phần tử index thì dispatch
    //nếu arrProject.length < 0 thì mảng ko có giá trị index thì sẽ ko dispatch
    // if(arrProject.length > 0){
    //   props.dispatch({
    //     type: GET_USER_BY_PROJECT_SAGA,
    //     idProject: arrProject[0]?.id,
    //   })
    //   }


    //khi hàm handleChange thay đổi, thì value của nó sẽ dc binding xuống các trường dưới
    return {
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingRemaining: 0,
      timeTrackingSpent: 0,
      projectId: arrProject[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      typeId: arrTaskType[0]?.id,
      listUserAsign: [],
    };
  },

  //bắt lỗi đăng nhập...
  validationSchema: Yup.object().shape({}),

  //hàm này lấy dữ liệu từ form sau khi ta submit
  //props từ redux sẽ dc nhận ở đây
  handleSubmit: (values, { props, setSubmitting }) => {
    //giá trị values là obj gồm những value mà mình nhập vào trường form

    props.dispatch({
      type: CREATE_TASK_SAGA,
      taskObject: values,
    });
    console.log("CreateTask", values);
  },
  //displayName dùng để phân biệt các formik với nhau
  displayName: "createTaskFormik",
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectJiraReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus,
  };
};

//hàm connect (hàm của redux) bọc thằng LoginJiraWithFormik thì LoginJiraWithFormik sẽ có props của redux
//cha mapStateToProps bọc con editProjectForm nên con nhận props
//lúc này editProjectForm đã sở hữu các thuộc tính của redux
export default connect(mapStateToProps)(createTaskForm);
