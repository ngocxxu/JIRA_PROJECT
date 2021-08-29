import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/Jira/JiraConst";


//đặt biến usLogin chứa 1 obj
let usLogin = {};

if(localStorage.getItem(USER_LOGIN)){
  //tại đây Json sẽ parse chuỗi chứa trog localstore thành obj
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {

  //sau khi xog các bước code trên, ta gán usLogin là giá trị mặc định của state
  userLogin : usLogin

}


export const UserJiraReducer = (state = stateDefault, action) => {
  switch(action.type) {
    case USLOGIN:{
      state.userLogin = action.userLogin;
      return { ...state};
    }


    default : return { ...state};
  }
}