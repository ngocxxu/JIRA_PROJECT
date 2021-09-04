import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/Jira/JiraConst";
import { GET_USER_BY_PROJECT } from "../constants/Jira/UserConst";

//đặt biến usLogin chứa 1 obj
let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  //tại đây Json sẽ parse chuỗi chứa trog localstore thành obj
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  //sau khi xog các bước code trên, ta gán usLogin là giá trị mặc định của state
  userLogin: usLogin,
  userSearch: [], //mảng này dc fileter lại
  arrUser: [
    // userId: 6,
    // name: "khai truong",
    // avatar: "https://ui-avatars.com/api/?name=khai truong",
    // email: "cyberlearn123@gmail.com",
    // phoneNumber: "0905807494"
  ] //mảng này dc fileter lại
};

export const UserJiraReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }

    case "GET_USER_SEARCH": {
      state.userSearch = action.listUsersSearch;
      return { ...state };
    }

    case GET_USER_BY_PROJECT: {
      state.arrUser = action.arrUser;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
