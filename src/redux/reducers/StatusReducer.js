import { GET_LIST_PROJECT } from "../constants/Jira/JiraConst"
import { GET_ALL_TASK_TYPE, GET_STATUS } from "../constants/Jira/TaskTypeConstant"

const initialState = {
  arrStatus: [],
}

export const StatusReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_STATUS   :
    return { ...state,arrStatus: action.arrStatus}

  default:
    return state
  }
}
