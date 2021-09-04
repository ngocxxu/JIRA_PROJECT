import { GET_ALL_COMMENT, INSERT_COMMENT } from "../constants/Jira/CommentConst"

const initialState = {
  lstComment: [
    {user:{
      userId: 6,
      name: 'John',
      avatar: 'https://ui-avatars.com/api/?name=Hung',
    },
    id:15,
    userId: 6,
    taskId: 85,
    contentComment: 'ahihi',
    deleted: false,
    alias: 'ahihi',  
  },
    {user:{
      userId: 6,
      name: 'John',
      avatar: 'https://ui-avatars.com/api/?name=Hung',
    },
    id:15,
    userId: 6,
    taskId: 85,
    contentComment: 'ahihi',
    deleted: false,
    alias: 'ahihi',  
  },


  ],
  postComment:{
    "taskId": 1137,
    "contentComment": "Hello mọi người"
  }
}

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENT:
      return { ...state, lstComment: action.commentDetail}

    // case INSERT_COMMENT:
    //   return { ...state, postComment: action.postComment}

  default:
    return state
  }
}
