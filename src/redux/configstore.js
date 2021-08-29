import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from "redux-thunk";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import LoadingReducer from "./reducers/LoadingReducer";
import {HistoryReducer} from "./reducers/HistoryReducer";
import {UserJiraReducer} from "./reducers/UserJiraReducer";
import {ProjectCategoryReducer} from "./reducers/ProjectCategoryReducer";


const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
  //reducer khái báo tại đây
  ToDoListReducer,
  LoadingReducer,
  HistoryReducer,
  UserJiraReducer,
  ProjectCategoryReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

//gọi saga thực thi
//hàm run nhận vào 1 generator function
middleWareSaga.run(rootSaga);

export default store;
