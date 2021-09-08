import Axios from "axios";
import {
  fork,
  take,
  takeEvery,
  delay,
  takeLatest,
  call,
  put,
  select
} from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import {
  GET_LIST_PROJECT_SAGA,
  USER_SIGNIN_API,
  USLOGIN
} from "../../constants/Jira/JiraConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import {
  TOKEN,
  USER_LOGIN,
  STATUS_CODE
} from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { userService } from "../../../services/UserService";
import { projectService } from "../../../services/ProjectService";
import {
  GET_USER_BY_PROJECT,
  GET_USER_BY_PROJECT_SAGA
} from "../../constants/Jira/UserConst";
import {
  DELETE_USER_ADMIN_SAGA,
  GET_USER_ADMIN,
  GET_USER_ADMIN_SAGA,
  GET_USER_SEARCH_ADMIN,
  GET_USER_SEARCH_ADMIN_SAGA,
  UPDATE_USER_ADMIN,
  UPDATE_USER_ADMIN_SAGA,
  USER_SIGN_UP_SAGA
} from "../../constants/Jira/UserFormConst";
import { notificationFunction } from "../../../util/Notification/notificationJira";
import { userAdminService } from "../../../services/UserAdminService";
import { CLOSE_DRAWER } from "../../constants/Jira/DrawerConst";

//------sign up --------------------------------
function* userSignUpSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });

  yield delay(500);

  try {
    //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
    const { data, status } = yield call(() =>
      userAdminService.userSignUpAPI(action.signUpForm)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log("userSignUpSaga", data);
      notificationFunction("success", "Register is successful");
      history.push("/login");
    }
  } catch (error) {
    console.log("error", error.response?.data);
    notificationFunction("error", "Register is unsuccessful");
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function* theoDoiUserSignUpSaga() {
  yield takeLatest(USER_SIGN_UP_SAGA, userSignUpSaga);
}

//------get user admin --------------------------------
function* userUserAdminSaga(action) {
  try {
    //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
    const { data, status } = yield call(() =>
      userAdminService.getUserAdminAPI()
    );

    if (status === STATUS_CODE.SUCCESS) {
      // console.log('userUserAdminSagaSUCCESS',data);
      yield put({
        type: GET_USER_ADMIN,
        arrUserAdmin: data.content
      });
    }
  } catch (error) {
    console.log("error", error.response?.data);
  }
}

export function* theoDoiGetUserAdminSaga() {
  yield takeLatest(GET_USER_ADMIN_SAGA, userUserAdminSaga);
}

//------get user SEARCH admin --------------------------------
// function* userUserSearchAdminSaga(action) {
//   try {
//     //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
//     const { data, status } = yield call(() =>
//       userAdminService.getUserAdminAPI()
//     );

//     if (status === STATUS_CODE.SUCCESS) {
//       // console.log('userUserAdminSagaSUCCESS',data);
//       yield put({
//         type: GET_USER_SEARCH_ADMIN,
//         listUsersAdminSearch: data.content
//       });
//     }
//   } catch (error) {
//     console.log("error", error.response?.data);
//   }
// }

// export function* theoDoiGetUserSearchAdminSaga() {
//   yield takeLatest(GET_USER_SEARCH_ADMIN_SAGA, userUserSearchAdminSaga);
// }

//------delete user admin --------------------------------
function* deleteUserAdminSaga(action) {
  try {
    //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
    const { data, status } = yield call(() =>
      userAdminService.deleteUserAdminAPI(action.userId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      notificationFunction("success", "Delete is successful");
      yield put({
        type: GET_USER_ADMIN_SAGA
      });
    }
  } catch (error) {
    console.log("error", error.response?.data);
    notificationFunction("error", "Delete is unsuccessful");
  }
}

export function* theoDoiDeleteUserAdminSaga() {
  yield takeLatest(DELETE_USER_ADMIN_SAGA, deleteUserAdminSaga);
}

//------put user admin --------------------------------
function* updateUserAdminSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });

  yield delay(500);

  try {
    //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
    const { data, status } = yield call(() =>
      jiraService.updateUserAdminAPI(action.updateUser)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log("updateUserAdminSagaSUCCESS", data);
      notificationFunction("success", "Update is successful");

      // yield put ({
      //   type: UPDATE_USER_ADMIN,
      //   updateUser: data.content,
      // })

      yield put({
        type: GET_USER_ADMIN_SAGA
      });

      yield put({
        type: CLOSE_DRAWER, //để tắt cái bảng Drawer sau khi ta sửa thành công
        visible: false
      });
    } else {
      notificationFunction("error", "Update is unsuccessful");
    }
  } catch (error) {
    console.log("error", error.response?.data);
    notificationFunction("error", "Update is unsuccessful");
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function* theoDoiUpdateUserAdminSaga() {
  yield takeLatest(UPDATE_USER_ADMIN_SAGA, updateUserAdminSaga);
}
