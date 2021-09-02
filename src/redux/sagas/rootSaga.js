import {all} from 'redux-saga/effects'

//import có dấu * là import nguyên cái file đó vô lun
//cách viết 1
import * as ToDoListSaga from './ToDoListSagaSaga'
//cách viết 2:
// import { theoDoiActionGetTaskApi } from './ToDoListSaga'

import * as Jira from './Jira/UserJiraSaga'
import * as ProjectCategorySaga from './Jira/ProjectCategorySaga'
import * as ProjectSaga from './Jira/ProjectSaga'
import * as TaskTypeSaga from './Jira/TaskTypeSaga'
import * as PrioritySaga from './Jira/PrioritySaga'
import * as TaskSaga from './Jira/TaskSaga'
import * as StatusSaga from './Jira/StatusSaga'


export function* rootSaga() {
  //nhận vào mảng với các nghiệp vụ mà nó theo dõi
  yield all([
    //nghiệp vụ theo dõi các action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTaskApi(),
    ToDoListSaga.theoDoiActionDoneTaskApi(),
    ToDoListSaga.theoDoiActionRejectTaskApi(),

    Jira.theoDoiSignin(),
    Jira.theoDoiGetUser(),
    Jira.theoDoiAddUserProject(),
    Jira.theoDoiRemoveUserProject(),
    Jira.theoDoiGetUserByProject(),

    ProjectCategorySaga.theoDoiGetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetailSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),

    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),

    PrioritySaga.theoDoiGetAllPrioritySaga(),

    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateStatusTaskSaga(),
    TaskSaga.theoDoiUpdateTaskSaga(),
    TaskSaga.theoDoiHandleChangePostApiSaga(),

    StatusSaga.theoDoiStatusSaga(),


  ])


}
