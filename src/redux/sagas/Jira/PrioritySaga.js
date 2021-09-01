import { call, put,takeLatest } from "redux-saga/effects";
import { priorityService } from "../../../services/PriorityService";
import { taskTypeService } from "../../../services/TaskTypeService";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../../constants/Jira/PriorityConst";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../../constants/Jira/TaskTypeConstant";

function * getAllPrioritySaga(action){

  try{
    const {status, data} = yield call (()=> priorityService.getAllPriority())

    yield put({
      type: GET_ALL_PRIORITY,
      arrPriority: data.content,
    })
    console.log('data',data)
  }catch(err){console.log(err.response.data)}

}

export function* theoDoiGetAllPrioritySaga() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}
