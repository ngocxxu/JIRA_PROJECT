import { call, put, takeLatest,delay } from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { CLOSE_DRAWER } from "../../constants/Jira/DrawerConst";
import { CREATE_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA } from "../../constants/Jira/JiraConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

//action nhận vào từ GET_ALL_PROJECT_CATEGORY_SAGA để thực hiện hàm bên dưới
function* createProjectSaga(action) {

  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING
  })

  yield delay(500)


  try {
    const { data, status } = yield call(() =>
      jiraService.createProjectAuthorization(action.newProject)
    );

    console.log(data);

    if (status === STATUS_CODE.SUCCESS) {
      //thêm thành công, ta chuyển hướng trang sang trang khác
      history.push('/projectmanagement');
    }else{
      console.log('error');
    }
  } catch (error) {
    console.log(error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  })
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

//------Saga dùng để get all project từ api

function * getListProjectSaga(action) {

try{
  const {status,data} = yield call(()=> jiraService.getListProject());

  if(status === STATUS_CODE.SUCCESS){
    yield put({
      type: GET_LIST_PROJECT,
      projectList: data.content, //kiểm tra trên server api về data gửi đi dữ liệu nào, ở đây data gửi đi content
    })
  }
}catch(err){
  console.error(err.response.data)
}


}
export function* theoDoiGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}


//------update project info--------------------------------
function* updateProjectSaga(action) {

  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING
  })

  yield delay(500)


  try {
    const { data, status } = yield call(() =>
      jiraService.updateProject(action.projectUpdate)
    );

    console.log(data);

    if (status === STATUS_CODE.SUCCESS) {
      //thêm thành công, ta chuyển hướng trang sang trang khác
      // history.push('/projectmanagement');
    }else{
      console.log('error');
    }
    yield put({
      type: GET_LIST_PROJECT_SAGA, //sau khi sửa thành công thì tại đây ta dispatch GET_LIST_PROJECT_SAGA để load lấy lại dữ liệu ng dùng từ API để render
    })
    yield put({
      type: CLOSE_DRAWER, //để tắt cái bảng Drawer sau khi ta sửa thành công
      visible: false,
    })


  } catch (error) {
    console.log(error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  })
}

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);
}
