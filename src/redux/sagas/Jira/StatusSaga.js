import { call, put,takeLatest } from "redux-saga/effects";
import { statusService } from "../../../services/StatusService";
import { taskService } from "../../../services/TaskService";
import { taskTypeService } from "../../../services/TaskTypeService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notificationFunction } from "../../../util/Notification/notificationJira";
import { CLOSE_DRAWER } from "../../constants/Jira/DrawerConst";
import { CREATE_TASK_SAGA, GET_ALL_TASK_TYPE, GET_CREATE_TASK_SAGA, GET_STATUS, GET_STATUS_SAGA, STATUS_SAGA } from "../../constants/Jira/TaskTypeConstant";

function * statusSaga(action){
  try{
    const {status, data} = yield call (()=> statusService.getAllStatus())

    yield put({
      type: GET_STATUS,
      arrStatus: data.content,
    })


  }catch(err){
    console.log(err.response.data)
  }

}

export function* theoDoiStatusSaga() {
  yield takeLatest(GET_STATUS_SAGA, statusSaga);
}
