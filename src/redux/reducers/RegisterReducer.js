/* eslint-disable import/no-anonymous-default-export */
import { USER_FORM_SERVICE } from "../constants/Jira/UserFormConst"

const initialState = {
  userForm: false,
}

export const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FORM_SERVICE:{
      state.userForm = action.userForm;
      return { ...state}
    }

  default:
    return state
  }
}
