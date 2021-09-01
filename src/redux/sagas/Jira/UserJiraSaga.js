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


//do siginSaga là 1 function* nên ta ko thể sử dụng props.history để redirect trang
function* signinSaga(action) {
  console.log(action);

  // yield delay (1000);

  //hiện loading
  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    //gọi api bên file JiraAction.js để kêu USER_SIGNIN_API xử lý, sau khi xử lý API thành công thì tiếp tục thực hiện các bước sau
    //hàm call giúp xử lý nhìu promise bên trong siginJira, cúi cùng trả về 1 promise để gọi hàm xử lý tip
    const { status, data } = yield call(() =>
      jiraService.signinJira(action.userLogin)
    );

    //login thành công, thì lưu access token vào local storage
    //ở đây localstoreage sẽ lấy data.accessToken vào TOKEN
    localStorage.setItem(TOKEN, data.content.accessToken);

    //từ localstore stringtify biến obj thành chuỗi để xử lý hình ảnh, logo,...
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    console.log(data);

    //sau khi login thành công, ta dispatch dữ liệu ng dùng lên reducers
    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    // //lấy giá trị về từ reducer
    // let history = yield select(state => state.HistoryReducer.history);

    history.push("/createBrowserHistory");
  } catch (err) {
    console.error(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

//----------Get user từ API để thực hiện tác vụ add member và search member trong ProjectManagement
function* getUserSaga(action) {
  //action.keyword : dữ liệu từ người dùng nhập vào khung search

  try {
    //gọi api bên file JiraAction.js để kêu USER_SIGNIN_API xử lý, sau khi xử lý API thành công thì tiếp tục thực hiện các bước sau
    //hàm call giúp xử lý nhìu promise bên trong siginJira, cúi cùng trả về 1 promise để gọi hàm xử lý tip
    const { status, data } = yield call(() =>
      userService.getUser(action.keyWord)
    );
    console.log('searchData',data)

    yield put({
      type: 'GET_USER_SEARCH',
      listUsersSearch: data.content,
    })

  } catch (err) {
    console.error(err.response.data);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}



//--------Thêm ng dùng vào dự án

function* addUserProjectSaga(action) {
  //action.keyword : dữ liệu từ người dùng nhập vào khung search
  try {
    //gọi api bên file JiraAction.js để kêu USER_SIGNIN_API xử lý, sau khi xử lý API thành công thì tiếp tục thực hiện các bước sau
    //hàm call giúp xử lý nhìu promise bên trong siginJira, cúi cùng trả về 1 promise để gọi hàm xử lý tip
    const { status, data } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );

    yield put({
      type: GET_LIST_PROJECT_SAGA, //sau khi sửa thành công thì tại đây ta dispatch GET_LIST_PROJECT_SAGA để load lấy lại dữ liệu ng dùng từ API để render
    })


  } catch (err) {
    console.error(err.response.data);
  }
}



export function* theoDoiAddUserProject() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}



//------delete User from project--------------------------------
function * removeUserFromProjectSaga(action) {


  try {
    //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
    const { data, status } = yield call(() =>
    userService.removeUserFromProject(action.userProject)
    );
    console.log('data123',data)

    yield put({
      type: GET_LIST_PROJECT_SAGA, //sau khi sửa thành công thì tại đây ta dispatch GET_LIST_PROJECT_SAGA để load lấy lại dữ liệu ng dùng từ API để render
    })

  } catch (error) {
    console.log('error',error.response.data);

  }

}

export function* theoDoiRemoveUserProject() {
  yield takeLatest('REMOVE_USER_PROJECT_SAGA', removeUserFromProjectSaga);
}




//------get user by project--------------------------------
function * getUserByProjectSaga(action) {


  try {
    //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
    const { data, status } = yield call(() =>
    userService.getUserByProjectId(action.idProject)
    );

    if(status === STATUS_CODE.SUCCESS){
      console.log('checkData',data);
      yield put({
        type: GET_USER_BY_PROJECT, //sau khi sửa thành công thì tại đây ta dispatch GET_LIST_PROJECT_SAGA để load lấy lại dữ liệu ng dùng từ API để render
        arrUser: data.content
      })
      }


  } catch (error) {
    console.log('error',error.response?.data);

  }

}

export function* theoDoiGetUserByProject() {
  yield takeLatest(GET_USER_BY_PROJECT_SAGA, getUserByProjectSaga);
}




