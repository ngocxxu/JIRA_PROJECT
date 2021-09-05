import Axios from "axios";
import {
  fork,
  take,
  takeEvery,
  delay,
  takeLatest,
  call,
  put,
  select,
} from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { GET_LIST_PROJECT_SAGA, USER_SIGNIN_API, USLOGIN } from "../../constants/Jira/JiraConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { TOKEN, USER_LOGIN, STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { userService } from "../../../services/UserService";
import { projectService } from "../../../services/ProjectService";
import { GET_USER_BY_PROJECT, GET_USER_BY_PROJECT_SAGA } from "../../constants/Jira/UserConst";
import { USER_SIGN_UP_SAGA } from "../../constants/Jira/UserFormConst";
import { notificationFunction } from "../../../util/Notification/notificationJira";
import { userAdminService } from "../../../services/UserAdminService";


//------sign up --------------------------------
function * userSignUpSaga(action) {

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);


  try {
    //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
    const { data, status } = yield call(() =>
    userAdminService.userSignUpAPI(action.signUpForm)
    );

    if(status === STATUS_CODE.SUCCESS){
      console.log('userSignUpSaga',data);
      notificationFunction("success", "Register is successful");
      history.push("/projectmanagement");
      }

  } catch (error) {
    console.log('error',error.response?.data);
    notificationFunction("error", "Register is unsuccessful");
  }

  yield put({
    type: HIDE_LOADING,
  });

}

export function* theoDoiUserSignUpSaga() {
  yield takeLatest(USER_SIGN_UP_SAGA, userSignUpSaga);
}
