import { notification } from "antd";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { notificationFunction } from "../../../util/Notification/notificationJira";
import { CLOSE_DRAWER } from "../../constants/Jira/DrawerConst";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
} from "../../constants/Jira/JiraConst";
import { GET_USER_BY_PROJECT_SAGA } from "../../constants/Jira/UserConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

//action nhận vào từ GET_ALL_PROJECT_CATEGORY_SAGA để thực hiện hàm bên dưới
function* createProjectSaga(action) {
  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      jiraService.createProjectAuthorization(action.newProject)
    );

    console.log(data);

    if (status === STATUS_CODE.SUCCESS) {
      //thêm thành công, ta chuyển hướng trang sang trang khác
      history.push("/projectmanagement");
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

//------Saga dùng để get all project từ api

function* getListProjectSaga(action) {
  try {
    const { status, data } = yield call(() => jiraService.getListProject());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT,
        projectList: data.content, //kiểm tra trên server api về data gửi đi dữ liệu nào, ở đây data gửi đi content
      });

    }
  } catch (err) {
    console.error(err.response.data);
  }
}
export function* theoDoiGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

//------update project info--------------------------------
function* updateProjectSaga(action) {
  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      jiraService.updateProject(action.projectUpdate)
    );

    console.log(data);

    if (status === STATUS_CODE.SUCCESS) {
      //thêm thành công, ta chuyển hướng trang sang trang khác
      // history.push('/projectmanagement');
    } else {
      console.log("error");
    }
    yield put({
      type: GET_LIST_PROJECT_SAGA, //sau khi sửa thành công thì tại đây ta dispatch GET_LIST_PROJECT_SAGA để load lấy lại dữ liệu ng dùng từ API để render
    });
    yield put({
      type: CLOSE_DRAWER, //để tắt cái bảng Drawer sau khi ta sửa thành công
      visible: false,
    });
  } catch (error) {
    console.log(error.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}

//------delete project info--------------------------------
function* deleteProjectSaga(action) {
  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );

    console.log(data);

    if (status === STATUS_CODE.SUCCESS) {
      //thêm thành công, ta chuyển hướng trang sang trang khác
      // history.push('/projectmanagement');
      notificationFunction("success", "Delete project is successful");
    } else {
      console.log("error");
      notificationFunction("error", "Delete project is unsuccessful");
    }
    yield put({
      type: GET_LIST_PROJECT_SAGA, //sau khi sửa thành công thì tại đây ta dispatch GET_LIST_PROJECT_SAGA để load lấy lại dữ liệu ng dùng từ API để render
    });
  } catch (error) {
    console.log(error.response.data);
    notificationFunction("error", "Delete project is unsuccessful");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiDeleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}

//------get project detail info--------------------------------
function* getProjectDetailSaga(action) {
  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING
  })

  yield delay(500)

  try {
    //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
    const { data, status } = yield call(() =>
      projectService.getProjectDetails(action.projectId)
      
    );

    //lấy dữ liệu thành công đưa lên redux 
    yield put({
      type: 'PUT_PROJECT_DETAIL',
      projectDetail: data.content,
    })

  } catch (error) {
    console.log(error.response.data);
    history.push("/projectmanagement"); 
  }

  yield put({
    type: HIDE_LOADING
  })
}

export function* theoDoiGetProjectDetailSaga() {
  yield takeLatest("GET_PROJECT_DETAIL_SAGA", getProjectDetailSaga);
}


//------get ALL project detail info--------------------------------
function* getAllProjectSaga(action) {
  // //hiển thị loading
  yield put({
    type: DISPLAY_LOADING
  })

  yield delay(500)

  try {
    //gọi api và nhận lại kết quả trả về từ api, rồi gán kết quả cho data, status
    const { data, status } = yield call(() =>
      projectService.getAllProject()
      
    );

    //lấy dữ liệu thành công đưa lên redux 
    yield put({
      type: GET_ALL_PROJECT,
      arrProject: data.content,
    })

    yield put({
      type: GET_USER_BY_PROJECT_SAGA,
      idProject: data.content[0].id,
    })


  } catch (error) {
    console.log(error.response.data);
    history.push("/projectmanagement"); 
  }

  yield put({
    type: HIDE_LOADING
  })
}

export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
