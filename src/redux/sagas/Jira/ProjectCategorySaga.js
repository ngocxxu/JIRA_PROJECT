import { call, put, takeLatest } from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/Jira/JiraConst";

//action nhận vào từ GET_ALL_PROJECT_CATEGORY_SAGA để thực hiện hàm bên dưới
function* getAllProjectCategorySaga(action) {
  try {
    //dùng call() trả về 1 promise là thằng cyberbugsService.getAllProjectCategory()
    const { data, status } = yield call(() =>
      jiraService.getAllProjectCategory()
    );

    console.log(data);

    if (status === STATUS_CODE.SUCCESS) {
      //gọi api thành công thì dispatch action 1 lên reducer thông qua put của saga
      yield put({
        type: "GET_ALL_PROJECT_CATEGORY",
        data: data.content,
      });
    }else{
      console.log('error');
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* theoDoiGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
