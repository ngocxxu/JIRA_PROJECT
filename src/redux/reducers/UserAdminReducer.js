import { CLOSE_DRAWER, OPEN_DRAWER } from "../constants/Jira/DrawerConst";
import {
  EDIT_USER_ADMIN_MODAL,
  GET_USER_ADMIN,
  OPEN_FORM_EDIT_USER_ADMIN,
  SET_SUBMIT_EDIT_USER_ADMIN
} from "../constants/Jira/UserFormConst";

const stateDefault = {
  arrUserAdmin: [
    {
      userId: 6,
      name: "khai truong",
      avatar: "https://ui-avatars.com/api/?name=khai truong",
      email: "cyberlearn123@gmail.com",
      phoneNumber: "0905807494"
    },
    {
      userId: 81,
      name: "NKTdsfdsfsdfdsfsd",
      avatar: "https://ui-avatars.com/api/?name=NKTdsfdsfsdfdsfsd",
      email: "kt.nguyen6789@gmail.com",
      phoneNumber: "0906574387sdfsdfsdfsd"
    }
  ],
  userEdit: {
    id: '',
    passWord: "",
    email: "string",
    name: "string",
    phoneNumber: "string",
    userId: 0,
  }
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

    default:
      return { ...state };
  }
};
