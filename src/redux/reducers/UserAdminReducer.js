import { CLOSE_DRAWER, OPEN_DRAWER } from "../constants/Jira/DrawerConst";
import {
  EDIT_USER_ADMIN_MODAL,
  GET_USER_ADMIN,
  OPEN_FORM_EDIT_USER_ADMIN,
  SEARCH_USER_ADMIN,
  SET_SUBMIT_EDIT_USER_ADMIN,
  GET_USER_SEARCH_ADMIN
} from "../constants/Jira/UserFormConst";

const stateDefault = {
  arrUserAdmin: [
    {
      userId: 81,
      name: "Nino",
      avatar: "https://ui-avatars.com/api/?name=NKTdsfdsfsdfdsfsd",
      email: "123@gmail.com",
      phoneNumber: "123456"
    }
  ],
  userEdit: {
    id: '',
    passWord: "",
    email: "string",
    name: "string",
    phoneNumber: "string",
    userId: 0,
  },
  userSearchAdmin:[]

};

export const UserAdminReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_USER_ADMIN: {
      state.arrUserAdmin = action.arrUserAdmin;
      return { ...state };
    }
    case EDIT_USER_ADMIN_MODAL: {
      state.userEdit = action.userEditModal;
      return { ...state };
    }

    case SEARCH_USER_ADMIN:{
      const arrUserSearchUpdate = state.arrUserAdmin.filter(user => user.userId == action.userSearch)
      state.arrUserAdmin = arrUserSearchUpdate;
      return { ...state };
    }

    case GET_USER_SEARCH_ADMIN:{
      state.userSearchAdmin = action.listUsersAdminSearch;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
