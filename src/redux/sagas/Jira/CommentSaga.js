import { call, put, takeLatest, select } from "redux-saga/effects";
import { commentService } from "../../../services/CommentService";
import { jiraService } from "../../../services/JiraService";
import { taskService } from "../../../services/TaskService";
import { taskTypeService } from "../../../services/TaskTypeService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notificationFunction } from "../../../util/Notification/notificationJira";
import { DELETE_COMMENT_SAGA, EDIT_COMMENT, EDIT_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA } from "../../constants/Jira/CommentConst";
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

//----------get all comment detail

function* getAllCommentSaga(action) {
  try {
    const { status, data } = yield call(() =>
    jiraService.getCommentDetail(action.taskIdCmt)
    );
    // console.log('getAllCommentSaga1',data);


    if (status === STATUS_CODE.SUCCESS) {
      // console.log('getAllCommentSaga2',data);

      yield put({
        type: GET_ALL_COMMENT,
        commentDetail: data.content,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log('errorAllCommentSaga',err.response.data);
  }
}

export function* theoDoiGetAllCommentSaga() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}
//----------insert comment 

function* insertCommentSaga(action) {
  try {
    const { status, data } = yield call(() =>
    jiraService.insertComment(action.postComment)
    );
    console.log('insertCommentSaga',data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskIdCmt: action.postComment.taskId,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}
//----------delete comment 

function* deleteCommentSaga(action) {
  try {
    const { status, data } = yield call(() =>
    jiraService.deleteComment(action.idComment)
    );
    console.log(data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskIdCmt: action.taskIdCmt,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}

//----------edit comment 

function* editCommentSaga(action) {

  try {
    const { status, data } = yield call(() =>
    jiraService.editComment(action.contentComment, action.id)
    );
    console.log('editCommentSagaDATA',data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskIdCmt: action.taskIdCmt,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiEditCommentSaga() {
  yield takeLatest(EDIT_COMMENT_SAGA, editCommentSaga);
}
