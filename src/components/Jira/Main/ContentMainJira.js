import React from "react";
import avatar1 from "../../../assets/img/ava1.jfif";
import avatar2 from "../../../assets/img/ava2.jfif";
import { useDispatch, useSelector } from "react-redux";
import { GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from "../../../redux/constants/Jira/TaskTypeConstant";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GET_ALL_COMMENT_SAGA } from "../../../redux/constants/Jira/CommentConst";

export default function ContentMainJira({ projectDetail, ...props }) {
  const dispatch = useDispatch();

  const { taskDetailModal } = useSelector((state) => state.TaskReducer);


  const handleDragEnd = (result) => {
    console.log(result);
    let {projectId, taskId} = JSON.parse(result.draggableId); //lấy ra chuỗi sau mỗi lần draggable và dùng JSON chuyển về obj
    let {source, destination} = result;
    console.log('source',source)
    console.log('destination',destination)
    console.log('source.draggableId',source.draggableId)

    //return dừng hàm, nếu nó tự kéo thả trên vị trí của nó thì ta ko cần phải update
    if(!destination){
      return;
    }
    //return dừng hàm, nếu nó tự kéo thả trên vị trí của nó thì ta ko cần phải update
    if(source.index === destination.index && source.droppableId === destination.droppableId){
      return;
    }
    //gọi api update lại status
    dispatch({
      type:UPDATE_STATUS_TASK_SAGA,
      taskUpdateStatus:{
        statusId: destination.droppableId,
        taskId:taskId,
        projectId:projectId,
      }
    })
  };
  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((tastListDetail, index) => {
          return (
            <Droppable key={index} droppableId={tastListDetail.statusId}>
              {(provided) => {
                return (
                  <div
                    className="card"
                    style={{ width: "17rem", height: "auto" }}
                  >
                    <div className="card-header">
                      {tastListDetail.statusName}
                    </div>
                    <div
                      className="list-group list-group-flush h-100"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                    >
                      {tastListDetail.lstTaskDeTail?.map((task, index) => {
                        // console.log(tastListDetail.lstTaskDeTail)
                        return (
                          <Draggable
                            key={task.taskId.toString()}
                            index={index}
                            draggableId={JSON.stringify({projectId: task.projectId, taskId: task.taskId})}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onClick={() => {
                                    dispatch({
                                      type: GET_TASK_DETAIL_SAGA,
                                      taskId: task.taskId,
                                    });

                                  }}
                                  key={index}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                >
                                  <p>{task.taskName}</p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="block-left">
                                      <p className="text-danger">
                                        {task.priorityTask.priority}
                                      </p>
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
                                        {task.assigness?.map((mem, index) => {
                                          return (
                                            <div key={index} className="avatar">
                                              <img
                                                src={mem.avatar}
                                                alt={mem.avatar}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
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
