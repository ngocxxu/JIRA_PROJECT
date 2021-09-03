import React, { useState } from "react";
import _ from "lodash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function DragAndDropDnd(props) {
  const [state, setState] = useState({
    toDo: {
      id: "toDo1",
      items: [
        { id: "1", taskName: "task 1" },
        { id: "2", taskName: "task 2" },
        { id: "3", taskName: "task 3" },
      ],
    },
    inProcess: {
      id: "inProcess1",
      items: [
        { id: "4", taskName: "task 4" },
        { id: "5", taskName: "task 5" },
        { id: "6", taskName: "task 6" },
      ],
    },
    done: {
      id: "done1",
      items: [
        { id: "7", taskName: "task 7" },
        { id: "8", taskName: "task 8" },
        { id: "9", taskName: "task 9" },
      ],
    },
  });
  const handleDragEnd = (result) => {
    // console.log(result);
    let {destination, source} = result;
    if(!destination){
      return ;
    }
    if(destination.index === source.index && destination.droppableId === source.droppableId){
      return;
    }

    //tạo ra 1 drag tag
    let itemCopy = {...state[source.droppableId].items[source.index]};
    console.log('itemCopy',itemCopy);

    //droppable bắt đầu kéo, xóa phần tử hiện tại
    let index = state[source.droppableId].items.filter(item => item.id !== itemCopy.id);
    //gán lại cho cái mảng bên dưới
    state[source.droppableId].items.splice(index, 1);
    
    //droppable thả vào, thêm phần tử mới từ vị trí kéo
    let dropDestination = {...state[destination.droppableId].items}
    //chèn vô vị trí 
    //destination.index: vị trí index mún chèn vô
    //itemcopy: phần tử muốn chèn vô vị trí index hiện tại
    dropDestination.splice(destination.index, 0, itemCopy)
    setState(state);
    console.log('destination',destination);
    console.log('source',source);
  }

  return (
    <div className="container">
      <h1 className="text-center">Drag and Drop DND</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          {/* hàm map Lodash biến obj State -> array State để duyệt render ra, bóc ra từng phần tử statusTask trong mảng state */}
          {_.map(state, (statusTask, index) => {
            return (
              <Droppable key={index} droppableId={statusTask.id}>
                {(provided) => {
                  return (
                    <div
                      className="col-4 text-white "
                      key={index}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div className="bg-dark p-2">
                        {statusTask.items.map((item, index) => {
                          return (
                            <Draggable
                              draggableId={item.id}
                              index={index}
                              key={item.id}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="text-center p-3 m-1 bg-danger"
                                  >
                                    {item.taskName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      </div>
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
