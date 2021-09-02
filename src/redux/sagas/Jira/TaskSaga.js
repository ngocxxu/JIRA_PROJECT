import { call, put, takeLatest } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { taskTypeService } from "../../../services/TaskTypeService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notificationFunction } from "../../../util/Notification/notificationJira";
import { CLOSE_DRAWER } from "../../constants/Jira/DrawerConst";
import {
  CREATE_TASK_SAGA,
  GET_ALL_TASK_TYPE,
  GET_CREATE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "../../constants/Jira/TaskTypeConstant";

function* createTaskSaga(action) {
  try {
    const { status, data } = yield call(() =>
      taskService.createTask(action.taskObject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log("tasksagaData", data);
      notificationFunction("success", "Submit task is successful");
    } else {
      console.log("error");
      notificationFunction("error", "Submit task is unsuccessful");
    }

    yield put({
      type: CLOSE_DRAWER,
    });
  } catch (err) {
    console.log(err.response.data);
    notificationFunction("error", "Submit task is unsuccessful");
  }
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

//----------get task detail

function* getTaskDetailSaga(action) {
  try {
    const { status, data } = yield call(() =>
      taskService.getTaskDetail(action.taskId)
    );

    if (status === STATUS_CODE.SUCCESS) {

      yield put({
        type: GET_TASK_DETAIL,
        taskDetailModal: data.content,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

//----------put(update) status task

function* updateStatusTaskSaga(action) {
  try {
    const { status, data } = yield call(() =>
      taskService.updateStatusTask(action.taskUpdateStatus)
      
    );
    console.log('updateStatusTask',data)
    if (status === STATUS_CODE.SUCCESS) {
      //sau khi lấy api thành công, gọi lại GET_TASK_DETAIL_SAGA để sắp xếp lại thông tin các task
      yield put({
        type: 'GET_PROJECT_DETAIL_SAGA',
        projectId: action.taskUpdateStatus.projectId,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiUpdateStatusTaskSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga);
}
