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
import { USER_SIGNIN_API, USLOGIN } from "../../constants/Jira/JiraConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import {TOKEN, USER_LOGIN} from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";


//do siginSaga là 1 function* nên ta ko thể sử dụng props.history để redirect trang
function * signinSaga(action) {
  console.log(action)

  // yield delay (1000);

  //hiện loading 
  yield put({
    type: DISPLAY_LOADING,
  })



  try{
  //gọi api bên file JiraAction.js để kêu USER_SIGNIN_API xử lý, sau khi xử lý API thành công thì tiếp tục thực hiện các bước sau
  //hàm call giúp xử lý nhìu promise bên trong siginJira, cúi cùng trả về 1 promise để gọi hàm xử lý tip
  const {status, data} = yield call(() => jiraService.signinJira(action.userLogin));

  //login thành công, thì lưu access token vào local storage
  //ở đây localstoreage sẽ lấy data.accessToken vào TOKEN
  localStorage.setItem(TOKEN, data.content.accessToken);

  //từ localstore stringtify biến obj thành chuỗi để xử lý hình ảnh, logo,...
  localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

  console.log(data)

  //sau khi login thành công, ta dispatch dữ liệu ng dùng lên reducers
    yield put({
      type: USLOGIN,
      userLogin: data.content,
    })


    // //lấy giá trị về từ reducer
    // let history = yield select(state => state.HistoryReducer.history);

    history.push('/home');


  }catch(err) {
    console.error(err.response.data)
  }

  yield put({
    type: HIDE_LOADING,
  })

}


export function * theoDoiSignin(){
  yield takeLatest(USER_SIGNIN_API, signinSaga)
};
