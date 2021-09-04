/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import { call, put, takeLatest, select } from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { taskService } from "../../../services/TaskService";
import { taskTypeService } from "../../../services/TaskTypeService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notificationFunction } from "../../../util/Notification/notificationJira";
import { CLOSE_DRAWER } from "../../constants/Jira/DrawerConst";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  CREATE_TASK_SAGA,
  GET_ALL_TASK_TYPE,
  GET_CREATE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_STATUS_TASK_SAGA,
  UPDATE_TASK_SAGA,
} from "../../constants/Jira/TaskTypeConstant";

function* createTaskSaga(action) {
  try {
    const { status, data } = yield call(() =>
    jiraService.createTask(action.taskObject)
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
  const { taskUpdateStatus } = action;
  try {
    const { status, data } = yield call(() =>
      jiraService.updateStatusTask(taskUpdateStatus)
    );
    // console.log("updateStatusTask", data);
    if (status === STATUS_CODE.SUCCESS) {
      //sau khi lấy api thành công, gọi lại GET_TASK_DETAIL_SAGA để sắp xếp lại thông tin các task
      yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId: taskUpdateStatus.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateStatus.taskId,
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

//----------update)status task

function* updateTaskSaga(action) {
  // try {
  //   const { status, data } = yield call(() =>
  //     taskService.updateTask(action.taskUpdate)
  //   );
  //   console.log("updateTask", data);
  // } catch (err) {
  //   console.log(err.response.data);
  // }
}

export function* theoDoiUpdateTaskSaga() {
  yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}

export function* handleChangePostApi(action) {
  //gọi action theo thứ tự làm thay đổi taskDetail modal

  switch (action.actionType) {
    case CHANGE_TASK_MODAL: {
      const { value, name } = action;
      yield put({
        type: CHANGE_TASK_MODAL,
        name,
        value,
      });
    };break;
    case CHANGE_ASSIGNESS: {
      const { userSelected } = action;
      yield put({
        type: CHANGE_ASSIGNESS,
        userSelected,
      });
    };break;
    case REMOVE_USER_ASSIGN: {
      const { userId } = action;
      yield put({
        type: REMOVE_USER_ASSIGN,
        userId,
      });
    };break;
  }

  //save lại qua api updatetasksaga
  //lấy dữ liệu từ state.taskDetailModal sau khi ta thay đổi
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  // console.log('taskDetailModal',taskDetailModal)

  //biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần
  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });
  taskDetailModal = { ...taskDetailModal, listUserAsign: listUserAsign };

  const taskUpdateApi = taskDetailModal;

  try {
    const { data, status } = yield call(() =>
      taskService.updateTask(taskUpdateApi)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId: taskUpdateApi.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiHandleChangePostApiSaga() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}

// updateStatusTask


