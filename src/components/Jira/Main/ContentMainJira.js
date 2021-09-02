import React from "react";
import avatar1 from "../../../assets/img/ava1.jfif";
import avatar2 from "../../../assets/img/ava2.jfif";
import { useDispatch, useSelector } from "react-redux";
import { GET_TASK_DETAIL_SAGA } from "../../../redux/constants/Jira/TaskTypeConstant";

export default function ContentMainJira({ projectDetail, ...props }) {

  const dispatch = useDispatch();
  const renderCardTaskList = () => {
    return projectDetail.lstTask?.map((tastListDetail, index) => {
      return (
        <div
          key={index}
          className="card"
          style={{ width: "17rem", height: "auto" }}
        >
          <div className="card-header">{tastListDetail.statusName}</div>
          <ul className="list-group list-group-flush">
            {tastListDetail.lstTaskDeTail?.map((task, index) => {
              console.log(tastListDetail.lstTaskDeTail)
              return (
                <li
                onClick={() => {
                  dispatch({
                    type: GET_TASK_DETAIL_SAGA,
                    taskId: task.taskId,
                  })
                }}
                  key={index}
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="#infoModal"
                  style={{ cursor: "pointer" }}
                >
                  <p>{task.taskName}</p>
                  <div className="block" style={{ display: "flex" }}>
                    <div className="block-left">
                      <p className="text-danger">{task.priorityTask.priority}</p>
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        {task.assigness?.map((mem, index) => {
                          return (
                            <div key={index} className="avatar">
                              <img src={mem.avatar} alt ={mem.avatar} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
}

{
  /* <div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">IN PROGRESS 2</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">DONE 3</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */
}
