import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER_ASSIGN } from "../constants/Jira/TaskTypeConstant";

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
    lstComment: [],
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

    case CHANGE_ASSIGNESS:
      //thay đổi mảng trong assigness và gán lại =` 1 mảng mới
    state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelected];
    return { ...state}

    case REMOVE_USER_ASSIGN:
    state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(assign => assign.id !== action.userId)]
    return { ...state }

    default:
      return state;
  }
};
