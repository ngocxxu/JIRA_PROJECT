import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_ALL_TASK_TYPE_SAGA,
  GET_STATUS_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_STATUS_TASK_SAGA,
} from "../../../redux/constants/Jira/TaskTypeConstant";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Jira/PriorityConst";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";

const { Option } = Select;

export default function ModalJira(props) {
  const dispatch = useDispatch();
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);

  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [content, setContent] = useState(taskDetailModal.description);

  useEffect(() => {
    dispatch({
      type: GET_STATUS_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
  }, []);

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);
    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name: name,
      value: value,
    })

    // dispatch({
    //   type: CHANGE_TASK_MODAL,
    //   name: name,
    //   value: value,
    // });
  };

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
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
                // setFieldValue("description", content);
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {

                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                })

                // dispatch({
                //   type: CHANGE_TASK_MODAL,
                //   name: "description",
                //   value: content, //content này của useState
                // });

                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={() => {

                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: historyContent,
                })
                
                setVisibleEditor(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setVisibleEditor(true);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select
                name="typeId"
                value={taskDetailModal.typeId}
                onChange={handleChange}
              >
                {arrTaskType?.map((task, index) => {
                  return (
                    <option key={index} value={task.id}>
                      {task.taskType}
                    </option>
                  );
                })}
              </select>
              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <p>Description</p>
                    {renderDescription()}
                  </div>
                  <div style={{ fontWeight: 500, marginBottom: 10 }}>
                    Jira Software (software projects) issue types:
                  </div>
                  <div className="title">
                    <div className="title-item">
                      <h3>
                        BUG <i className="fa fa-bug" />
                      </h3>
                      <p>
                        A bug is a problem which impairs or prevents the
                        function of a product.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        STORY <i className="fa fa-book-reader" />
                      </h3>
                      <p>
                        A user story is the smallest unit of work that needs to
                        be done.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        TASK <i className="fa fa-tasks" />
                      </h3>
                      <p>A task represents work that needs to be done</p>
                    </div>
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img src="./assets/img/download (1).jfif" alt />
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div
                          className="display-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img src="./assets/img/download (1).jfif" alt />
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{ color: "#929398" }}>Edit</span>•
                              <span style={{ color: "#929398" }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      onChange={(e) => {
                        handleChange(e);

                        // dispatch({
                        //   type: UPDATE_STATUS_TASK_SAGA,
                        //   taskUpdateStatus: {
                        //     taskId: taskDetailModal.taskId,
                        //     statusId: e.target.value ,
                        //     projectId: taskDetailModal.projectId,
                        //   }
                        // })
                        // console.log('taskUpdate',{
                        //   taskId: taskDetailModal.taskId,
                        //   statusId: e.target.value ,
                        // })
                      }}
                      className="custom-select"
                      value={taskDetailModal.statusId}
                    >
                      {arrStatus?.map((status, index) => {
                        return (
                          <option value={status.statusId} key={index}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {taskDetailModal.assigness?.map((assign, index) => {
                        return (
                          <div className="col-8 mt-2 mb-2">
                            <div
                              key={index}
                              style={{ display: "flex" }}
                              className="item"
                            >
                              <div className="avatar">
                                <img src={assign.avatar} alt={assign.avatar} />
                              </div>
                              <p className="name">{assign.name}</p>
                              <div
                              style={{cursor: "pointer" }}
                                onClick={() => {
                                  dispatch({
                                    type: HANDLE_CHANGE_POST_API_SAGA,
                                    actionType: REMOVE_USER_ASSIGN,
                                    userId: assign.id,
                                  })
                              

                                  // dispatch({
                                  //   type: REMOVE_USER_ASSIGN,
                                  //   userId: assign.id,
                                  // });
                                }}
                              >
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 5 }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="col-12 mt-2 mb-2">
                        <Select
                          options={projectDetail.members
                            ?.filter((mem) => {
                              //xét điều kiện, nếu index đã tồn tại
                              let index = taskDetailModal.assigness?.findIndex(
                                (us) => us.id === mem.userId
                              );
                              if (index !== -1) {
                                return false;
                              }
                              return true; //nếu là true thì hàm map bên dưới sẽ binding những index đã dc filter
                            })
                            .map((mem, index) => {
                              return { value: mem.userId, label: mem.name };
                            })}
                          optionFilterProp="label" //khi mà ta chọn trong bảng Options thì nó chỉ hiện tên Label thôi
                          style={{ width: "100%" }}
                          name="lstUser"
                          value="+ Add More"
                          className="form-control"
                          onSelect={(value) => {
                            //return, ko cho ng dùng làm gì tiếp, để họ chọn
                            if (value == "0") {
                              return;
                            }
                            let userSelected = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );
                            console.log("userSelected", userSelected);
                            //do mảng assigness ko có thuộc tính userId mà là thuộc tính id,
                            //và do mảng userSelected thiếu thuộc tính id
                            //do đó ta tạo ra 1 thuộc tính mới là id chứa trong mảng userSelected và id đó dc gán =` giá trị của userSelected.userId
                            userSelected = {
                              ...userSelected,
                              id: userSelected.userId,
                            };

                            dispatch({
                              type: HANDLE_CHANGE_POST_API_SAGA,
                              actionType: CHANGE_ASSIGNESS,
                              userSelected
                            })
                        


                            // dispatch({
                            //   type: CHANGE_ASSIGNESS,
                            //   userSelected: userSelect,
                            // });
                          }}
                        ></Select>
                      </div>
                    </div>
                  </div>
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskDetailModal.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {arrPriority?.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      type="text"
                      name="originalEstimate"
                      className="estimate-hours"
                      value={taskDetailModal.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
