import { CHANGE_TASK_MODAL, GET_TASK_DETAIL } from "../constants/Jira/TaskTypeConstant";

const initialState = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 2,
      priority: "Medium",
    },
    taskTypeDetail: {
      id: 1,
      taskType: "bug",
    },
    assigness: [
      {
        id: 305,
        avatar: "https://ui-avatars.com/api/?name=Hung",
        name: "Hung",
        alias: "hung",
      },
    ],
    lstComment: [
      {
        id: 569,
        idUser: 305,
        name: "Hung",
        avatar: "https://ui-avatars.com/api/?name=Hung",
        commentContent: "hung cmt",
      },
      {
        id: 570,
        idUser: 305,
        name: "Hung",
        avatar: "https://ui-avatars.com/api/?name=Hung",
        commentContent: "hung cmt 2",
      },
    ],
    taskId: 925,
    taskName: "backlog 2",
    alias: "backlog-2",
    description: "<p>safsafds sdfhisdh ffdsf&nbsp;</p>",
    statusId: "2",
    originalEstimate: 20,
    timeTrackingSpent: 11,
    timeTrackingRemaining: 11,
    typeId: 1,
    priorityId: 2,
    projectId: 1132,
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL:
      state.taskDetailModal = action.taskDetailModal;
      return { ...state };

    case CHANGE_TASK_MODAL:

    return { ...state, taskDetailModal: {...state.taskDetailModal,[action.name]:action.value}};

    default:
      return state;
  }
};
