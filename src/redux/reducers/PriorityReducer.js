import { GET_LIST_PROJECT } from "../constants/Jira/JiraConst"
import { GET_ALL_PRIORITY } from "../constants/Jira/PriorityConst"
import { GET_ALL_TASK_TYPE } from "../constants/Jira/TaskTypeConstant"

const initialState = {
  arrPriority: [],
}

export const PriorityReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_PRIORITY   :
    return { ...state,arrPriority: action.arrPriority}

  default:
    return state
  }
}
