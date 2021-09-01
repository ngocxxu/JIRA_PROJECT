import { call, put,takeLatest } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { taskTypeService } from "../../../services/TaskTypeService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notificationFunction } from "../../../util/Notification/notificationJira";
import { CLOSE_DRAWER } from "../../constants/Jira/DrawerConst";
import { CREATE_TASK_SAGA, GET_ALL_TASK_TYPE, GET_CREATE_TASK_SAGA } from "../../constants/Jira/TaskTypeConstant";

function * createTaskSaga(action){
  try{
    const {status, data} = yield call (()=> taskService.createTask(action.taskObject))

    if (status === STATUS_CODE.SUCCESS) {
      console.log('tasksagaData',data);
      notificationFunction("success", "Submit task is successful");

    } else {
      console.log("error");
      notificationFunction("error", "Submit task is unsuccessful");

    }

    yield put({
      type: CLOSE_DRAWER,
    })

  }catch(err){
    console.log(err.response.data)
    notificationFunction("error", "Submit task is unsuccessful");
  }

}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}
