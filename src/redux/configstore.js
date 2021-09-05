import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from "redux-thunk";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import LoadingReducer from "./reducers/LoadingReducer";
import {HistoryReducer} from "./reducers/HistoryReducer";
import {UserJiraReducer} from "./reducers/UserJiraReducer";
import {ProjectCategoryReducer} from "./reducers/ProjectCategoryReducer";
import {ProjectJiraReducer} from "./reducers/ProjectJiraReducer";
import { DrawerJiraReducer } from "./reducers/DrawerJiraReducer";
import { ProjectReducer } from "./reducers/ProjectReducer";
import { TaskTypeReducer } from "./reducers/TaskTypeReducer";
import { PriorityReducer } from "./reducers/PriorityReducer";
import { StatusReducer } from "./reducers/StatusReducer";
import { TaskReducer } from "./reducers/TaskReducer";
import { CommentReducer } from "./reducers/CommentReducer";
import { RegisterReducer } from "./reducers/RegisterReducer";


const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
  //reducer khái báo tại đây
  ToDoListReducer,
  LoadingReducer,
  HistoryReducer,
  UserJiraReducer,
  ProjectCategoryReducer,
  ProjectJiraReducer,
  DrawerJiraReducer,
  ProjectReducer,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  TaskReducer,
  RegisterReducer,
  CommentReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

//gọi saga thực thi
//hàm run nhận vào 1 generator function
middleWareSaga.run(rootSaga);

export default store;
