import React, { useRef, useState } from "react";
import "./DemoDragDrop.css";
import { useSpring, animated } from "react-spring";

const defaultValue = [
  { id: 1, taskName: "task 1" },
  { id: 2, taskName: "task 2" },
  { id: 3, taskName: "task 3" },
  { id: 4, taskName: "task 4" },
  { id: 5, taskName: "task 5" },
];

//useRef ko bị thay đổi sau mỗi lần setState
export default function DemoDragDrop(props) {
  const [taskList, setTaskList] = useState(defaultValue);
  const tagDragRef = useRef({});
  const tagDragEnter = useRef({});

  //animation
  const [propsSpring, set, stop] = useSpring(() => ({
    from: { bottom: -25 },
    to: { bottom: 0 },
    config: { duration: 250 },
    //mỗi lần setState lại thì animation chạy lại, do animation chỉ chạy 1 lần
    reset: true,
  }));

  const handleDragStart = (e, taskDragStart, index) => {
    //lưu lại cái tag task mà ko làm thay đổi nó
    //lưu lại giá trị của task đang drag
    tagDragRef.current = taskDragStart;
  };

  //dragover qua thằng tag nào thì thằng tag task đó sẽ nhận sự kiện
  const handleDragOver = (e, task, index) => {};

  const handleDragEnd = (e, task, index) => {
    // //thẻ đang kéo và buông ra
    // tagDragRef.current = {};
    // //làm vậy để render lại
    // setTaskList([...taskList]);
  };
  const handleOnDrop = (e) => {
    console.log("tagDROP", e.target);
  };
  const handleDragEnter = (e, taskDragEnter, index) => {
    set({ bottom: 0 });

    //lưu lại giá trị của taskDragEnter
    tagDragEnter.current = { ...taskDragEnter };

    //sao chép mnảng, để lưu trữ vị trí cũ
    let taskListUpdate = [...taskList];

    //lấy ra index thằng đang kéo
    let indexDragTag = taskListUpdate.findIndex(
      (task) => task.id === tagDragRef.current.id
    );

    //lấy ra index thằng bị kéo qua
    let indexDragEnter = taskListUpdate.findIndex(
      (task) => task.id === taskDragEnter.id
    );

    //biến chứa giá trị thằng đang kéo
    let temp = taskListUpdate[indexDragTag];

    //lấy giá trị thằng kéo qua gán =` thằng đang kéo
    taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];

    //lấy thằng kéo qua gán =` thằng đang kéo
    taskListUpdate[indexDragEnter] = temp;

    setTaskList(taskListUpdate);
  };

  return (
    <div
      className="container"
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={(e) => {
        //thẻ đang kéo và buông ra
        tagDragRef.current = {};

        //làm vậy để render lại
        setTaskList([...taskList]);
      }}
    >
      <h1>Task List</h1>
      <div className="row">
        <div className="col-2"></div>
        <div className="bg-dark p-5 col-8">
          {taskList.map((task, index) => {
            //thêm class dragTag vô
            let cssDragTag = task.id === tagDragRef.current.id ? "dragTag" : "";

            if (task.id === tagDragEnter.current.id) {
              return (
                <animated.div
                  style={{
                    position: "relative",
                    bottom: propsSpring.bottom.interpolate(
                      (numBottom) => `${numBottom}px`
                    ),
                  }}
                  onDragStart={(e) => {
                    handleDragStart(e, task, index);
                  }}
                  onDragEnter={(e) => {
                    handleDragEnter(e, task, index);
                  }}
                  // onDragOver={(e) => {
                  //   handleDragOver(e, task, index);
                  // }}
                  onDragEnd={(e) => {
                    handleDragEnd(e, task, index);
                  }}
                  draggable="true"
                  key={index}
                  className={`bg-success text-white m-2 p-3`}
                >
                  {task.taskName}
                </animated.div>
              );
            }

            return (
              <div
                onDragStart={(e) => {
                  handleDragStart(e, task, index);
                }}
                onDragEnter={(e) => {
                  handleDragEnter(e, task, index);
                }}
                // onDragOver={(e) => {
                //   handleDragOver(e, task, index);
                // }}
                onDragEnd={(e) => {
                  handleDragEnd(e, task, index);
                }}
                draggable="true"
                key={index}
                className={`bg-success text-white m-2 p-3 ${cssDragTag}`}
              >
                {task.taskName}
              </div>
            );
          })}
        </div>
        <div
          className="col-2 bg-danger"
          style={{ height: "500px" }}
          // draggable="true"
          // onDragOver={(e) => {
          //   e.stopPropagation();
          //   e.preventDefault();
          // }}
          // onDrop={(e) => {
          //   handleOnDrop(e);
          // }}
        >
          ABCDEFGH
        </div>
      </div>
    </div>
  );
}
